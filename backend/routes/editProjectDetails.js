const express = require('express');
const route = express.Router();

const editProjectDetailsController = require('../controllers/editProjectDetailsController.js');

route.post('/edit-project', editProjectDetailsController.editProjectDetails);

module.exports = route;