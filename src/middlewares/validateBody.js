const { ValidationException } = require('../exceptions');

const validateBody = (schema) => (req, _, next) => {

  console.log('req.body', req.body)

  const result = schema.safeParse(req.body);

  if (!result.success) {
    console.log(result.error.message);

    next(new ValidationException(result.error.message));
    return;
  }

  req.body = result.data;

  next();
};

module.exports = validateBody;
