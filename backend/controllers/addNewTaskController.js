const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../', 'data', 'data.json');
exports.addNewTask = (req, res, next) => {
    const {taskName, projectId} = req.body;

    fs.readFile(filePath, (error, fileContent) => {
        let array = [];
        if(!error) {
            array = JSON.parse(fileContent);
            array.forEach(element => {
                if(element.id === projectId) {
                    element.tasks.push({taskName: taskName, id: element.tasks.length+1});
                }
            });
            fs.writeFile(filePath, JSON.stringify(array), (error) => {
                if(!error) res.end();
            });
        }
    });
    
}