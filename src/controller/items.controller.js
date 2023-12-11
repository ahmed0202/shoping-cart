const itemsModel = require("../model/items.model");
const itemsValidation = require("../validation/items.validation");
class ItemsController {
  getAllItems = () => async (req, res) => {
    const data = await itemsModel.getAllItems();
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  getAllItemsView = () => async (req, res) => {
    const data = await itemsModel.getAllItemsView();
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  getItemById = () => async (req, res) => {
    const item_id = req.params;

    const validate = itemsValidation.validateItemId(item_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await itemsModel.getItemById(item_id);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };

  getItemByBrand = () => async (req, res) => {
    const brand_id = req.params;
    const validate = itemsValidation.validateItemOptional(brand_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await itemsModel.getItemByBrand(brand_id);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  createItem = () => async (req, res) => {
    const body = { ...req.body, item_id: null };
    const validate = itemsValidation.validateCreateItem(body);

    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await itemsModel.createItem(body);
    if (data == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({ message: "success", data });
  };
  updateItem = () => async (req, res) => {
    const body = { ...req.body, ...req.params };

    const validate = itemsValidation.validateUpdateItem(body);

    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await itemsModel.updateItem(body);
    if (data == 0) {
      return res.status(304).json({
        message: "no data modefied",
      });
    }
    const item = await itemsModel.getItemById({ item_id: body.item_id });
    if (item.length == 0) {
      return res.status(404).json({
        message: "no data found",
      });
    }
    return res.status(200).json({
      message: "success",
      item,
    });
  };
  deleteItem = () => async (req, res) => {
    const item_id = req.params;

    const validate = itemsValidation.validateItemId(item_id);
    if (validate.error) {
      return res.status(304).json({
        message: "something went wrong",
      });
    }
    const data = await itemsModel.deleteItem(item_id);

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

module.exports = new ItemsController();
