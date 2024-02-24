const Project = require('../model/Project.js');

exports.taskComplete = (req, res, next) => {
    const {taskId, taskDone, projectId} = req.body;
    Project.readFile((fileContent) => {
        fileContent[projectId-1].tasks.forEach(task => {
            if(task.id === taskId) {
                task.taskDone = taskDone;
            }
        });

        Project.writeFile(fileContent, (error) => {
            if(error)
                console.log("Error when writing to a file in taskComplete: ", error);
            res.end();
        });
    });
    

    res.end();
}