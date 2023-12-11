const express = require("express");
const ordersRouter = express();
const ordersController = require("../controller/orders.controllers");
// get all orders
ordersRouter.get("/", ordersController.getAllOrders());

// get all orders view
ordersRouter.get("/view", ordersController.getAllOrdersView());

// get order by id
ordersRouter.get("/:order_id", ordersController.getOrderById());

// create order
ordersRouter.post("/create", ordersController.createOrder());

// update order
ordersRouter.put("/:order_id/edite", ordersController.updateOrder());

// delete order
ordersRouter.delete("/:order_id/delete", ordersController.deleteOrder());

module.exports = ordersRouter;
