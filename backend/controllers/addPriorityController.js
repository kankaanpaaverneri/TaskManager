const Project = require('../model/Project.js');

exports.addPriority = (req, res, next) => {
    const {taskId, taskPriority, projectId} = req.body;

    Project.fetchAllProjects()
    .then(result => {
        const projects = result[0];
        const filteredProjects = projects.filter(proj => proj.id === projectId);
        const selectedProject = filteredProjects[0];
        selectedProject.tasks.forEach(task => {
            if(task.taskId === taskId)
                task.taskPriority = taskPriority;
        })
        Project.updateTasks(projectId, selectedProject.tasks)
        .then(() => {
            console.log("Success");
            res.end();
        })
        .catch((err) => {
            console.log("Failed: ", err);
            res.end();
        });
    })
    .catch(err => {
        console.log("Error occured in addPriority controller: ", err);
    })
}