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

const getTask = (req, res) => {
  res.status(200).json({ id: req.params.id });
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
