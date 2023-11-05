
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];


class Task {
  constructor(id, title, description, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }
}

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  const newTask = new Task(Date.now().toString(), title, description, status);
  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, status } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[taskIndex] = { id, title, description, status };
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
