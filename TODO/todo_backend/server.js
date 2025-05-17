const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable or fallback to localhost
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/TODO';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.listen(5000, () => {
    console.log('Server listening on port: 5000
