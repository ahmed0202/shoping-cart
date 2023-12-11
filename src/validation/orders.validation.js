const Joi = require("joi");

class OrdersValidation {
  validateCreateOrder = (data) => {
    const scheme = Joi.object({
      order_id: Joi.optional(),
      order_date: Joi.date().required(),
      item_id: Joi.number().required(),
      order_qty: Joi.number().min(1).required(),
      order_price: Joi.number().required(),
      user_id: Joi.number().required(),
    });
    return scheme.validate(data);
  };
  validateUpdateOrder = (data) => {
    const scheme = Joi.object({
      order_id: Joi.required(),
      item_id: Joi.number().required(),
      user_id: Joi.number().required(),
      order_qty: Joi.number().min(1).optional(),
      order_date: Joi.date().optional(),
      order_price: Joi.number().optional(),
    });
    return scheme.validate(data);
  };
  validateOrderOptional = (data) => {
    const scheme = Joi.object({
      order_id: Joi.number().optional(),
      brand_id: Joi.number().optional(),
      order_name: Joi.string().optional(),
    });
    return scheme.validate(data);
  };
  validateOrderId = (data) => {
    const scheme = Joi.object({
      order_id: Joi.number().required(),
    });
    return scheme.validate(data);
  };
}

module.exports = new OrdersValidation();
