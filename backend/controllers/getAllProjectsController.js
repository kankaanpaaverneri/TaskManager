const Project = require('../model/Project');

exports.getAllProjects = async (req, res, next) => {
    try {
        const [columns] = await Project.fetchAllProjects();
        res.json(columns);
        res.end();
    } catch(error) {
        console.log("Error getting allProjects: ", error);
    }
}