// we set up our own custom error class to use to create error instances
// of specific structure when we need to
class CustomError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, statusCode) => new CustomError(message, statusCode);

module.exports = {
  CustomError,
  createCustomError,
};
