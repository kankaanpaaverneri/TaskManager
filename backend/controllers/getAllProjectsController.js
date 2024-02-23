const Project = require('../model/Project');

exports.getAllProjects = async (req, res, next) => {
    Project.fetchAllProjects((allProjects) => {
        if(allProjects) {
            res.json(allProjects);
        }
        res.end();
    });
}