const Project = require('../model/Project.js');

exports.sortByPriority = (req, res, next) => {
    const {projectId, tasks} = req.body;

    Project.readFile((fileContent) => {
        fileContent[projectId-1].tasks = tasks;

        Project.writeFile(fileContent, (error) => {
            if(error)
                console.log("Error when writing to file: ", error);

            res.end();
        });
    });
} 