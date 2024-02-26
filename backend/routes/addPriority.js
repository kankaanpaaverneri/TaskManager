const express = require('express');
const route = express.Router();
const addProjectController = require('../controllers/addPriorityController');

route.post('/add-priority', addProjectController.addPriority);

module.exports = route;