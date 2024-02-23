const express = require('express');
const cors = require('cors');
const addProjectController = require('../controllers/AddProjectController');
const route = express.Router();
route.use(cors());
route.post('/', addProjectController.addNewProject);

module.exports = route;