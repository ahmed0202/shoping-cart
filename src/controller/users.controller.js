const usersModel = require("../model/users.model");
const usersValidation = require("../validation/users.validation");
class UsersController {
  getAllUsers = () => async (req, res) => {
    const data = await usersModel.getAllUsers();
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  getUserById = () => async (req, res) => {
    const user_id = req.params;
    const validate = usersValidation.validateUserId(user_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await usersModel.getUserById(user_id);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  createUser = () => async (req, res) => {
    const body = req.body;
    const validate = usersValidation.validateUser(body);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await usersModel.createUser(body);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  updateUser = () => async (req, res) => {
    const { user_name } = req.body;
    const { user_id } = req.params;
    const body = { user_name, user_id };
    const validate = usersValidation.validateUser(body);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await usersModel.updateUser(body);
    if (data == 0) {
      return res.status(304).json({
        message: "no data modefied",
      });
    }
    const user = await usersModel.getUserById(body.user_id);
    if (user.length == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({
      message: "success",
      user,
    });
  };
  deleteUser = () => async (req, res) => {
    const user_id = req.params;
    console.log(user_id);
    const validate = usersValidation.validateUserId(user_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await usersModel.deleteUser(user_id);

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

module.exports = new UsersController();
