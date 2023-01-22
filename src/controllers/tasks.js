const Task = require('../models/task');

const getAllTasks = async (req, res) => {
  try {
    // IMPORTANT!!! Technically Models QUERIES DOES NOT RETURN Promise
    // BUT they HAVE "THEN" METHOD implemented which is convenient for us
    // as we now can use "async-await" combo. One of the available "query"-methods
    // is "find". It accepts a "filter object". For example:
    // - Task.find({}) will resolve to ALL TASKS from the "tasks" collection in DB;
    // - Task.find({ completed: tru }) will resolve to ALL COMPLETED TASKS;
    // const tasks = await Task.find({ completed: true });
    const tasks = await Task.find({});

    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  try {
    // here we use what was added to DB
    const task = await Task.create(req.body);

    return res.status(201).json({ task });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    // here we use another Model query - "findOne"
    const task = await Task.findOne({ _id: taskId });

    // this condition is to distinguish cases:
    // 1) user provided ID of correct format but no task with matching ID was found then it is 404;
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskId} found` });
    }

    return res.status(200).json({ task });
  } catch (err) {
    // 2) user provided ID of incorrect format and no task was found then it is 500 (or 400 maybe?);
    return res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    // "findOneAndUpdate" is an interesting query because it has several gotchas by default:
    // - it resolves to a PREVIOUS (before update) version of the document;
    // - it DOES NOT VALIDATE data that we are using when updating.
    // To fix this behavior we just need to pass a 3rd argument (which is "options"):
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true, // fix resolved value
      runValidators: true, // enable validation
    });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskId} found` });
    }

    return res.status(200).json({ task });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskId} found` });
    }

    // when it comes to sending back data after request was handled there are numerous ways
    // of doing it:
    return res.status(200).json({ task });
    // return res.status(200).json({ task: null, status: 'success' });
    // return res.status(200).send();
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
