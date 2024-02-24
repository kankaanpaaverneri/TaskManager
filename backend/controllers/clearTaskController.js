const Project = require('../model/Project');

exports.clearTask = (req, res, next) => {
    const {taskId, projectId} = req.body;
    Project.readFile((fileContent) => {
        const tasks = fileContent[projectId-1].tasks;

        //Clear task
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        //Reassing ids
        filteredTasks.forEach((task, index) => task.id = index+1);

        fileContent[projectId-1].tasks = filteredTasks;

        Project.writeFile(fileContent, (error) => {
            if(error)
                console.log("Error when writing to a file in Clear task: ", error);
            res.end();
        });
    });
}