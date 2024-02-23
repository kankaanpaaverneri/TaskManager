const express = require('express');
const getAllProjectsController = require('../controllers/getAllProjectsController.js');
const route = express.Router();
route.get('/get-all-projects', getAllProjectsController.getAllProjects);

module.exports = route;