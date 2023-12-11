-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Dec 11, 2023 at 08:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoping_cart`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`) VALUES
(1, 'adidass3'),
(2, 'nike');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `item_barcode` text NOT NULL,
  `item_image_url` text NOT NULL,
  `brand_id` int(11) NOT NULL,
  `item_available_qty` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `item_name`, `item_barcode`, `item_image_url`, `brand_id`, `item_available_qty`) VALUES
(1, 'sport', '12345678910', '', 1, 12),
(2, 'grass-shoe', '12345678911', '', 2, 0),
(3, 'sport', '12345678910', '', 1, -6),
(4, 'grass-shoe', '12345678911', '', 2, 9),
(5, 'sandla', '854611661', '', 1, 8),
(6, 'crocs', '544546464', '', 2, 2),
(7, 'running', '12345678910', '', 1, 9),
(8, 'running', '12345678910', '', 1, 9);

-- --------------------------------------------------------

--
-- Stand-in structure for view `items_view`
-- (See below for the actual view)
--
CREATE TABLE `items_view` (
`item_id` int(11)
,`item_name` varchar(200)
,`item_barcode` text
,`item_image_url` text
,`brand_id` int(11)
,`item_available_qty` int(7)
,`brand_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `item_id` int(11) NOT NULL,
  `order_qty` int(7) NOT NULL,
  `order_price` int(7) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `item_id`, `order_qty`, `order_price`, `user_id`) VALUES
(23, '2023-12-11 08:46:17', 3, 5, 4, 1),
(24, '2023-12-11 08:46:17', 3, 5, 4, 1);

--
-- Triggers `orders`
--
DELIMITER $$
CREATE TRIGGER `qty_add` AFTER INSERT ON `orders` FOR EACH ROW UPDATE items,orders SET items.item_available_qty =items.item_available_qty - new.order_qty where items.item_id = new.item_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `qty_delete` BEFORE DELETE ON `orders` FOR EACH ROW UPDATE items,orders SET items.item_available_qty =items.item_available_qty + old.order_qty where items.item_id = old.item_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `qty_update` AFTER UPDATE ON `orders` FOR EACH ROW UPDATE items,orders SET items.item_available_qty =(items.item_available_qty + (OLD.order_qty - NEW.order_qty)) WHERE items.item_id = OLD.item_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `orders_view`
-- (See below for the actual view)
--
CREATE TABLE `orders_view` (
`order_id` int(11)
,`order_date` datetime
,`order_qty` int(7)
,`order_price` int(7)
,`item_id` int(11)
,`item_name` varchar(200)
,`item_image_url` text
,`brand_id` int(11)
,`brand_name` varchar(100)
,`total_price` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`) VALUES
(1, 'omser3'),
(2, 'hokar'),
(7, 'omser'),
(8, 'omser'),
(11, 'omser'),
(12, 'omser'),
(13, 'omser'),
(14, 'omser'),
(15, 'omser'),
(16, 'omser'),
(17, 'omser3');

-- --------------------------------------------------------

--
-- Structure for view `items_view`
--
DROP TABLE IF EXISTS `items_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `items_view`  AS SELECT `items`.`item_id` AS `item_id`, `items`.`item_name` AS `item_name`, `items`.`item_barcode` AS `item_barcode`, `items`.`item_image_url` AS `item_image_url`, `items`.`brand_id` AS `brand_id`, `items`.`item_available_qty` AS `item_available_qty`, `brands`.`brand_name` AS `brand_name` FROM (`items` join `brands`) WHERE `items`.`brand_id` = `brands`.`brand_id` ;

-- --------------------------------------------------------

--
-- Structure for view `orders_view`
--
DROP TABLE IF EXISTS `orders_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `orders_view`  AS SELECT `orders`.`order_id` AS `order_id`, `orders`.`order_date` AS `order_date`, `orders`.`order_qty` AS `order_qty`, `orders`.`order_price` AS `order_price`, `items`.`item_id` AS `item_id`, `items`.`item_name` AS `item_name`, `items`.`item_image_url` AS `item_image_url`, `brands`.`brand_id` AS `brand_id`, `brands`.`brand_name` AS `brand_name`, `orders`.`order_qty`* `orders`.`order_price` AS `total_price` FROM ((`orders` join `items`) join `brands`) WHERE `orders`.`item_id` = `items`.`item_id` AND `items`.`brand_id` = `brands`.`brand_id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `brand_name` (`brand_name`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
