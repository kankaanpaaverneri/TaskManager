const Project = require('../model/Project');

exports.clearTask = (req, res, next) => {
    const {taskId, projectId} = req.body;

    Project.fetchAllProjects().then(projects => {
        const filteredProjects = projects[0].filter(project => project.id === projectId);
        const selectedProject = filteredProjects[0];

        selectedProject.tasks = [...selectedProject.tasks.filter(task => {
            if(task.taskId !== taskId) return task;
        })];

        selectedProject.tasks.forEach((task, index) => {
            task.taskId = index + 1;
        });

        Project.updateTasks(projectId, selectedProject.tasks)
        .then(() => {
            console.log("Success");
            res.end();
        })
        .catch((err) => {
            console.log("Error: ", err);
            res.end();
        });
    })
}