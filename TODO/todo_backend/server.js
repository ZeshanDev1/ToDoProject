const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Use the correct MongoDB host (defined in docker-compose as "mongo")
mongoose.connect('mongodb://mongo:27017/TODO', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => {
  console.log('Server listening on port: 5000');
});

// Add a new todo
app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Get all todos
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Mark a todo as done
app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Update a todo task
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate(id, { task: task }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Delete a todo
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

module.exports = app;
