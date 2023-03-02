const joi = require("joi");

exports.validatePostCountries = (body) => {
  const schema = joi.object({
    land: joi.string().required(),
    befolkning: joi.number().required(),
    sprak: joi.string().required(),
    huvudstad: joi.string().required(),
  });

  const validering = schema.validate(body);

  if (validering.error) {
    return validering.error.details[0].message;
  }
};
