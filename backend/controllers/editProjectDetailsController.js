const Project = require('../model/Project.js');

exports.editProjectDetails = function(req, res, next) {
    const {projectId, projectName, projectDescription, projectDate} = req.body;

    Project.readFile(fileContent => {
        fileContent[projectId-1].projectName = projectName;
        fileContent[projectId-1].description = projectDescription;
        fileContent[projectId-1].date = projectDate;

        Project.writeFile(fileContent, (error) => {
            if(error)
                console.log("Error when writing to file: ", error);
            res.end();
        });
    });
}