const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  // IMPORTANT!!! Technically Models QUERIES DOES NOT RETURN Promise
  // BUT they HAVE "THEN" METHOD implemented which is convenient for us
  // as we now can use "async-await" combo. One of the available "query"-methods
  // is "find". It accepts a "filter object". For example:
  // - Task.find({}) will resolve to ALL TASKS from the "tasks" collection in DB;
  // - Task.find({ completed: tru }) will resolve to ALL COMPLETED TASKS;
  // const tasks = await Task.find({ completed: true });
  const tasks = await Task.find({});

  return res.status(200).json({ tasks });
  // we can respond with what we want:
  // return res.status(200).json({ tasks, amount: tasks.length });
  // return res
  //   .status(200)
  //   .json({ status: 'success', data: { tasks, amount: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  // here we use what was added to DB
  const task = await Task.create(req.body);

  return res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  // here we use another Model query - "findOne"
  const task = await Task.findOne({ _id: taskId });

  // this condition is to distinguish cases:
  // 1) user provided ID of correct format but no task with matching ID was found then it is 404;
  if (!task) {
    // return res.status(404).json({ msg: `No task with id ${taskId} found` });
    // now when we have our own error handling middleware in place, we can just
    // (1)CREATE an error in a controller AND (2) PASS it to the next middleware (all
    // the way to custom error handling one which is at the end of middleware chain), so we
    // don't have to deal with it right now and repeat ourselves:
    return next(createCustomError(`No task with id ${taskId} found`, 404));
  }

  return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  // "findOneAndUpdate" is an interesting query because it has several gotchas by default:
  // - it resolves to a PREVIOUS (before update) version of the document;
  // - it DOES NOT VALIDATE data that we are using when updating.
  // To fix this behavior we just need to pass a 3rd argument (which is "options"):
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true, // fix resolved value
    runValidators: true, // enable validation
    // overwrite: true // use ONLY if we want to completely overwrite the document
  });

  if (!task) {
    // return res.status(404).json({ msg: `No task with id ${taskId} found` });
    return next(createCustomError(`No task with id ${taskId} found`, 404));
  }

  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    // return res.status(404).json({ msg: `No task with id ${taskId} found` });
    return next(createCustomError(`No task with id ${taskId} found`, 404));
  }

  // when it comes to sending back data after request was handled there are numerous ways
  // of doing it:
  return res.status(200).json({ task });
  // return res.status(200).json({ task: null, status: 'success' });
  // return res.status(200).send();
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
