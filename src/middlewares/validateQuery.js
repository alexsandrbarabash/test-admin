const { ValidationException } = require('../exceptions');

const validateQuery = (schema) => (req, _, next) => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    next(new ValidationException(result.error.message));
    return;
  }

  req.params = result.data;

  next();
};

module.exports = validateQuery;
