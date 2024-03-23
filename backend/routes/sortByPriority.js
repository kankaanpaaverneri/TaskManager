const express = require('express');
const route = express.Router();
const sortByPriorityController = require('../controllers/sortByPriorityController.js');

route.post('/sort-by-priority', sortByPriorityController.sortByPriority);

module.exports = route;