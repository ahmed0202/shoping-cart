const ordersModel = require("../model/orders.model");
const ordersValidation = require("../validation/orders.validation");
class OrdersController {
  getAllOrders = () => async (req, res) => {
    const data = await ordersModel.getAllOrders();
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  getAllOrdersView = () => async (req, res) => {
    const data = await ordersModel.getAllOrdersView();
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  getOrderById = () => async (req, res) => {
    const order_id = req.params;
    const validate = ordersValidation.validateOrderId(order_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await ordersModel.getOrderById(order_id);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  createOrder = () => async (req, res) => {
    const body = req.body;
    const validate = ordersValidation.validateCreateOrder(body);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await ordersModel.createOrder(body);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  updateOrder = () => async (req, res) => {
    const body = { ...req.body, ...req.params };

    const validate = ordersValidation.validateUpdateOrder(body);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await ordersModel.updateOrder(body);
    if (data == 0) {
      return res.status(304).json({
        message: "no data modefied",
      });
    }
    const order = await ordersModel.getOrderById({ order_id: body.order_id });
    if (order.length == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({
      message: "success",
      order,
    });
  };
  deleteOrder = () => async (req, res) => {
    const order_id = req.params;

    const validate = ordersValidation.validateOrderId(order_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await ordersModel.deleteOrder(order_id);

    if (data == 0) {
      return res.status(404).json({
        message: "no data modefied",
      });
    }
    return res.status(200).json({
      message: "success",
    });
  };
}

module.exports = new OrdersController();
