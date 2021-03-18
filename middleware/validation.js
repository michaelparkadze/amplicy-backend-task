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

// const fetchAssetValidation = (data) => {
//   const schema = Joi.object({
//     id: Joi.string().required().strict(),
//   });

//   return schema.validate(data, options);
// };

module.exports = {
  assetCreationValidation,
  // fetchAssetValidation,
};
