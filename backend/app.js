const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
bodyParser.urlencoded({extended: false});

const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const getAllProjects = require(path.join(__dirname, 'routes', 'getAllProjects.js'));
const addProject = require(path.join(__dirname, 'routes', 'addProject.js'));
const addNewTask = require(path.join(__dirname, 'routes', 'addNewTask.js'));
const clearTask = require(path.join(__dirname, 'routes', 'clearTask.js'));
const addTaskComplete = require(path.join(__dirname, 'routes', 'addTaskComplete.js'));
const addPriority = require(path.join(__dirname, 'routes', 'addPriority.js'));
const sortByPriority = require(path.join(__dirname, 'routes', 'sortByPriority.js'));

app.use(sortByPriority);
app.use(addPriority);
app.use(addTaskComplete);
app.use(addNewTask);
app.use(clearTask);
app.use(getAllProjects);
app.use(addProject);


app.listen(3000);