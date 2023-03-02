const joi = require("joi");

exports.validateDeleteCountries = (body) => {
  const schema = joi.object({
    land: joi.string().required(),
  });

  const validering = schema.validate(body);

  if (validering.error) {
    return validering.error.details[0].message;
  }
};
