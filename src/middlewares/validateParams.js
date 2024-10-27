const { ValidationException } = require('../exceptions');

const validateParams = (schema) => (req, _, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    next(new ValidationException(result.error.message));
    return;
  }

  req.params = result.data;

  next();
};

module.exports = validateParams;
