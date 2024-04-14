const Project = require('../model/Project.js');

exports.editProjectDetails = function(req, res, next) {
    const {projectId, projectName, projectDescription, projectDate} = req.body;

    Project.updateProject({projectId, projectName, projectDescription, projectDate})
    .then(() => {
        console.log("Success");
        res.end();
    })
    .catch((err) => {
        console.log("failed: ", err);
        res.end();
    });
}