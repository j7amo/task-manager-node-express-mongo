const { CustomError } = require('../errors/custom-error');

// we still need to pass "next" even if we do not use it directly here
const errorHandler = (err, req, res, next) => {
  // here we handle our own custom errors(differently from some generic ones)
  if (err instanceof CustomError) {
    // we want to have dynamic values for "messages" and "statusCode"
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // here we handle generic errors thrown by MongoDB itself (e.g. when we try to request
  // a document by querying the ID that has incorrect number of characters)
  return res.status(500).json({ msg: 'Something went wrong' });
};

module.exports = errorHandler;
