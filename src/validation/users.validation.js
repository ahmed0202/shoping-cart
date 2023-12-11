const Joi = require("joi");

class UsersValidation {
  validateUser = (data) => {
    const scheme = Joi.object({
      user_id: Joi.number().optional(),
      user_name: Joi.string().required(),
    });
    return scheme.validate(data);
  };
  validateUserId = (data) => {
    const scheme = Joi.object({
      user_id: Joi.number().required(),
    });
    return scheme.validate(data);
  };
}

module.exports = new UsersValidation();
