// it's kind of cumbersome to set up "try-catch" boilerplate inside
// each and every component, so we define a special wrapper that:
// - accepts a controller;
// - decorates it with "async" + "try-catch";
// - returns an upgraded controller basically.
const asyncWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = asyncWrapper;
