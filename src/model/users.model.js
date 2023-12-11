const db_connection = require("../db_connection");
class UsersModel {
  getAllUsers = async () => {
    const data = await db_connection.select("*").from("users");
    return data;
  };
  getUserById = async (user_id) => {
    const data = await db_connection("*").from("users").where(user_id);
    return data;
  };
  createUser = async (body) => {
    const user_id = await db_connection("users").insert(body);

    const data = await db_connection("*")
      .from("users")
      .where({ user_id: user_id[0] });
    return data;
  };
  updateUser = async (body) => {
    const data = await db_connection("users")
      .where({ user_id: body.user_id })
      .update({ ...body });
    return data;
  };
  deleteUser = async (user_id) => {
    const data = await db_connection("users").where(user_id).del();
    return data;
  };
}

module.exports = new UsersModel();
