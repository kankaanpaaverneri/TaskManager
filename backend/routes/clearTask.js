const express = require('express');
const route = express.Router();
const clearTaskController = require('../controllers/clearTaskController');

route.post('/clear-task', clearTaskController.clearTask);

module.exports = route;