const dotenv = require('dotenv');

dotenv.config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Controllers
const authCtrl = require('./controllers/auth');

// Middleware
const verifyToken = require('./middleware/verify-token');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Public Routes
app.use('/auth', authCtrl);

// Protected Routes
app.use(verifyToken);

app.get('/test', (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: 'you are logged in!' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('The express app is ready!');
});
