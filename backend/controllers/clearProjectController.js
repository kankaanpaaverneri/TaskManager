const Project = require('../model/Project.js');

exports.clearProject = (req, res, next) => {
    const project = req.body;

    Project.removeProject(project.id)
    .then(() => {
        console.log("success");
        res.end();
    })
    .catch((err) => {
        console.log("failed: ", err);
        res.end();
    });

    
    
}