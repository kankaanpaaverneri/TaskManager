const express = require("express");
const route = express.Router();
const addNewTaskController = require('../controllers/addNewTaskController.js');

route.post("/add-new-task", addNewTaskController.addNewTask);

module.exports = route;