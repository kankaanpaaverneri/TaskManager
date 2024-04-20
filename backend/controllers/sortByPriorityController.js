const Project = require('../model/Project.js');

exports.sortByPriority = (req, res, next) => {
    const {projectId, tasks} = req.body;

    Project.fetchAllProjects()
    .then(result => {
        const projects = result[0];
        const filteredProjects = projects.filter(proj => proj.id === projectId);
        const selectedProject = filteredProjects[0];
        selectedProject.tasks = [...tasks];
        Project.updateTasks(projectId, selectedProject.tasks)
        .then(() => {
            console.log("Success");
            res.end();
        })
        .catch(err => {
            console.log("Failed: Error in sortByPriority: ", err);
            res.end();
        })
    })
    .catch(err => {
        console.log("Error when fetchingAllProject: ", err);
        res.end();
    })
} 