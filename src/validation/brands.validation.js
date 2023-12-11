const Joi = require("joi");

class BrandsValidation {
  validateBrand = (data) => {
    const scheme = Joi.object({
      brand_id: Joi.number().optional(),
      brand_name: Joi.string().required(),
    });
    return scheme.validate(data);
  };
  validateBrandId = (data) => {
    const scheme = Joi.object({
      brand_id: Joi.number().required(),
    });
    return scheme.validate(data);
  };
}

module.exports = new BrandsValidation();
