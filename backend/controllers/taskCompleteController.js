const Project = require('../model/Project.js');

exports.taskComplete = (req, res, next) => {
    const {taskId, taskDone, projectId} = req.body;
    Project.fetchAllProjects().then(projects => {
        const filteredProjects = projects[0].filter(project => {
            if(project.id === projectId)
                return project;
        });

        const selectedProject = filteredProjects[0];
        selectedProject.tasks.forEach(task => {
            if(task.taskId === taskId)
                task.taskDone = taskDone;
        })
        Project.updateTasks(projectId, selectedProject.tasks)
        .then(() => {
            console.log("Success");
            res.end();
        })
        .catch(err => {
            console.log("Failed: ", err);
        });
        
        res.end();
    })
    .catch(err => {
        console.log("Failed: ", err);
        res.end();
    })
}