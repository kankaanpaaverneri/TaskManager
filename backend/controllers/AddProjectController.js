const Project = require("../model/Project");

exports.addNewProject = async (req, res, next) => {
    const {projectName, description, date} = req.body;
    const proj = new Project(projectName, description, date, []);
    proj.saveProject().then(() => {
        console.log("Success");
    }).catch(error => {
        console.log("Error: ", error);
    })
    res.end();
}