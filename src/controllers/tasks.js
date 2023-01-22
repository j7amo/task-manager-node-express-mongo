const getAllTasks = (req, res) => {
  res.status(200).send('get all tasks');
};

const createTask = (req, res) => {
  res.status(200).json(req.body);
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
