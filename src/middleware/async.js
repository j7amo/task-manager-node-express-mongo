// it's kind of cumbersome to set up "try-catch" boilerplate inside
// each and every component, so we define a special wrapper that:
// - accepts a controller;
// - decorates it with "async" + "try-catch";
// - returns an upgraded controller basically.
const asyncWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    // we pass error (if there is one) to the next middleware
    // AND it will be handled by DEFAULT MIDDLEWARE for error handling
    // which comes built-in into Express and added to VERY END of middleware chain by default!
    next(err);
  }
};

module.exports = asyncWrapper;
