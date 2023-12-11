const db_connection = require("../db_connection");
class BrandsModel {
  getAllBrands = async () => {
    const data = await db_connection.select("*").from("brands");
    return data;
  };
  getBrandById = async (brand_id) => {
    const data = await db_connection("*").from("brands").where(brand_id);
    return data;
  };
  createBrand = async (body) => {
    const brand_id = await db_connection("brands").insert(body);

    const data = await db_connection("*")
      .from("brands")
      .where({ brand_id: brand_id[0] });
    return data;
  };
  updateBrand = async (body) => {
    const data = await db_connection("brands")
      .where({ brand_id: body.brand_id })
      .update({ ...body });
    return data;
  };
  deleteBrand = async (brand_id) => {
    const data = await db_connection("brands").where(brand_id).del();
    return data;
  };
}

module.exports = new BrandsModel();
