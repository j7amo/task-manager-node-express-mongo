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

const updateTask = (req, res) => {
  res.status(200).send('update task');
};

const deleteTask = (req, res) => {
  res.status(200).send('delete task');
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
