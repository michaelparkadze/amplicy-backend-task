const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const assetCreationValidation = (data) => {
  const schema = Joi.object({
    ip: Joi.string().required().strict(),
    name: Joi.string().min(2).required().strict(),
    description: Joi.string().required().allow(""),
  });

  return schema.validate(data, options);
};

const scanJobCreationValidation = (data) => {
  const schema = Joi.object({
    assetId: Joi.string().required().strict(),
    dueDate: Joi.date().required(),
  });

  return schema.validate(data, options);
};

module.exports = {
  assetCreationValidation,
  scanJobCreationValidation,
};
