const Project = require('../model/Project');

exports.addNewTask = (req, res, next) => {
    const {
        projectId,
        taskName,
        taskDone,
        taskPriority,
        taskId
    } = req.body;

    Project.fetchAllProjects(projectId).then((projects) => {
        const selectedProject = projects[0].filter(project => project.id === projectId);

        selectedProject[0].tasks.push({
            taskName: taskName,
            taskDone: taskDone,
            taskPriority: taskPriority,
            taskId: taskId});

        Project.addTask(projectId, selectedProject[0].tasks)
        .then(() => {
            console.log("Success");
            res.end();
        })
        .catch((err) => {
            console.log("Failed task insert: ", err);
            res.end();
        });
    })
    .catch((err) => {
        console.log("Failed: ", err);
        res.end();
    });
}