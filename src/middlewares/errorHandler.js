const errorHandler = (err, _, res) => {
  console.log(err.stack);
  res.status(err?.status || 500).send(err.message || 'Something broke!');
};

module.exports = errorHandler;
