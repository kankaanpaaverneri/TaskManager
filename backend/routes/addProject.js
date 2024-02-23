const express = require('express');
const addProjectController = require('../controllers/AddProjectController');
const route = express.Router();
route.post('/add-new-project', addProjectController.addNewProject);

module.exports = route;