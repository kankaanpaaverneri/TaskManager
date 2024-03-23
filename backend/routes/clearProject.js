const express = require('express');
const route = express.Router();
const clearProjectController = require('../controllers/clearProjectController.js');

route.post('/clear-project', clearProjectController.clearProject);

module.exports = route;