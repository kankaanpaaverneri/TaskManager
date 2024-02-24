const express = require('express');
const taskCompleteController = require('../controllers/taskCompleteController');
const route = express.Router();

route.post('/task-done', taskCompleteController.taskComplete);

module.exports = route;