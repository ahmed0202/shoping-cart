const Joi = require("joi");

class ItemsValidation {
  validateCreateItem = (data) => {
    const scheme = Joi.object({
      brand_id: Joi.number().required(),
      item_name: Joi.string().required(),
      item_barcode: Joi.number().required(),
      item_available_qty: Joi.number().required(),
      item_image_url: Joi.optional(),
      item_id: Joi.optional(),
    });
    return scheme.validate(data);
  };
  validateUpdateItem = (data) => {
    const scheme = Joi.object({
      item_id: Joi.number().required(),
      brand_id: Joi.number().optional(),
      item_name: Joi.string().optional(),
      item_barcode: Joi.number().optional(),
      item_available_qty: Joi.number().optional(),
      item_image_url: Joi.optional(),
    });
    return scheme.validate(data);
  };
  validateItemOptional = (data) => {
    const scheme = Joi.object({
      item_id: Joi.number().optional(),
      brand_id: Joi.number().optional(),
      item_name: Joi.string().optional(),
    });
    return scheme.validate(data);
  };
  validateItemId = (data) => {
    const scheme = Joi.object({
      item_id: Joi.number().required(),
    });
    return scheme.validate(data);
  };
}

module.exports = new ItemsValidation();
