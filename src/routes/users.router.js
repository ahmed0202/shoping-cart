const express = require("express");
const usersRouter = express();
const usersController = require("../controller/users.controller");
// get all users
usersRouter.get("/", usersController.getAllUsers());

// get user by id
usersRouter.get("/:user_id", usersController.getUserById());

// create user
usersRouter.post("/register", usersController.createUser());

// update user
usersRouter.put("/:user_id/edite", usersController.updateUser());

// delete user
usersRouter.delete("/:user_id/delete", usersController.deleteUser());

module.exports = usersRouter;
