const joi = require("joi");

exports.validatePatchCountries = (body) => {
  const schema = joi.object({
    land: joi.string().required(),
    nyckel: joi.string().valid("befolkning", "sprak", "huvudstad").required(),
    varde: joi.string().required(),
  });

  const validering = schema.validate(body);

  if (validering.error) {
    return validering.error.details[0].message;
  }
};
