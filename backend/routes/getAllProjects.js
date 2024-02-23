const express = require('express');
const getAllProjectsController = require('../controllers/getAllProjectsController.js');
const route = express.Router();
route.get('/', getAllProjectsController.getAllProjects);

module.exports = route;