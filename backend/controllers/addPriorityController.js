const Project = require('../model/Project.js');

exports.addPriority = (req, res, next) => {
    const {taskId, priority, projectId} = req.body;
    
    Project.readFile((fileContent) => {
        fileContent[projectId-1].tasks[taskId-1].taskPriority = priority;
        Project.writeFile(fileContent, (error) => {
            if(error) {
                console.log("Error reading file: ", error);
            }
            res.end();
        });
    });
}