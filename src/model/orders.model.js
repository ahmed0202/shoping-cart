const db_connection = require("../db_connection");
class OrdersModel {
  getAllOrders = async () => {
    const data = await db_connection.select("*").from("orders");
    return data;
  };
  getAllOrdersView = async () => {
    const data = await db_connection("*").from("orders_view");
    return data;
  };
  getOrderById = async (order_id) => {
    const data = await db_connection("*").from("orders").where(order_id);
    return data;
  };
  createOrder = async (body) => {
    const order_id = await db_connection("orders").insert(body);

    const data = await db_connection("*")
      .from("orders")
      .where({ order_id: order_id[0] });
    return data;
  };
  updateOrder = async (body) => {
    const { order_id } = body;
    const data = await db_connection("orders").where({ order_id }).update(body);
    return data;
  };
  deleteOrder = async (order_id) => {
    const data = await db_connection("orders").where(order_id).del();
    return data;
  };
}

module.exports = new OrdersModel();
