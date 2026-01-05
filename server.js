const dotenv = require('dotenv');

dotenv.config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Controllers
const authCtrl = require('./controllers/auth');
const treeCtrl=require('./controllers/tree')

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
app.use('/tree', treeCtrl);
// Protected Routes
app.use(verifyToken);



app.listen(process.env.PORT || 3000, () => {
  console.log('The express app is ready!');
});
