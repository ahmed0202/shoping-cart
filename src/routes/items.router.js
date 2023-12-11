const express = require("express");
const itemsRouter = express();
const itemsController = require("../controller/items.controller");
// get all items
itemsRouter.get("/", itemsController.getAllItems());

// get all items view
itemsRouter.get("/view", itemsController.getAllItemsView());

// get item by id
itemsRouter.get("/:item_id", itemsController.getItemById());

// get items by brands
itemsRouter.get("/brand/:brand_id", itemsController.getItemByBrand());

// create item
itemsRouter.post("/create", itemsController.createItem());

// update item
itemsRouter.put("/:item_id/edite", itemsController.updateItem());

// delete item
itemsRouter.delete("/:item_id/delete", itemsController.deleteItem());

module.exports = itemsRouter;
