const Project = require('../model/Project.js');

exports.clearProject = (req, res, next) => {
    const projects = req.body;
    Project.writeFile(projects, (error) => {
        if(error) {
            console.log("Error clearing projects: ", error);

            res.end();
        }
    });
}