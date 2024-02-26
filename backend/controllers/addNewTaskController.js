const Project = require('../model/Project');

exports.addNewTask = (req, res, next) => {
    const {taskName, taskDone, projectId} = req.body;

    Project.readFile((fileContentArray) => {
        fileContentArray.forEach(element => {
            //Add task to appropriate project
            if(element.id === projectId) {
                element.tasks.push({
                    taskName: taskName,
                    taskDone: taskDone,
                    taskPriority: 0,
                    id: element.tasks.length+1
                });
            }
        });

        //Rewrite data.json file
        Project.writeFile(fileContentArray, (error) => {
            if(error) {
                console.log("Error writing to file: ", error);
            }
            res.end();
        });
    });
}