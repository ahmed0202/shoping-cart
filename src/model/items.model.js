const db_connection = require("../db_connection");
class ItemsModel {
  getAllItems = async () => {
    const data = await db_connection.select("*").from("items");
    return data;
  };
  getAllItemsView = async () => {
    const data = await db_connection.select("*").from("items_view");
    return data;
  };
  getItemById = async (item_id) => {
    const data = await db_connection("*").from("items").where(item_id);
    return data;
  };
  getItemByBrand = async (brand_id) => {
    const data = await db_connection("*").from("items").where(brand_id);
    return data;
  };
  createItem = async (body) => {
    const item_id = await db_connection("items").insert(body);

    const data = await db_connection("*")
      .from("items")
      .where({ item_id: item_id[0] });
    return data;
  };
  updateItem = async (body) => {
    const { item_id } = body;
    const data = await db_connection("items").where({ item_id }).update(body);
    return data;
  };
  deleteItem = async (item_id) => {
    const data = await db_connection("items").where(item_id).del();
    return data;
  };
}

module.exports = new ItemsModel();
