module.exports = class NotFound extends Error {
  constructor(message) {
    super(message || 'Not Found Exception');
    this.status = 404;
  }
};
