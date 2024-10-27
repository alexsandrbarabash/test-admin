const { ValidationException } = require('../exceptions');

const validateBody = (schema) => (req, _, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    next(new ValidationException(result.error.message));
    return;
  }

  req.body = result.data;

  next();
};

module.exports = validateBody;
