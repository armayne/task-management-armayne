const { tasks } = require('../models/taskModel');

const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

const getTasksByStatus = (req, res) => {
  const { status } = req.params;
  const filteredTasks = tasks.filter(task => task.status.toLowerCase() === status.toLowerCase());
  res.status(200).json(filteredTasks);
};

const createTask = (req, res) => {
  const { title, description, status, due_date } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    due_date,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  const task = tasks.find(task => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.due_date = due_date || task.due_date;

  res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
};

module.exports = {
  getTasks,
  getTasksByStatus,
  createTask,
  updateTask,
  deleteTask,
};
