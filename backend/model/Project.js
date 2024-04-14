const database = require('../util/database');

module.exports = class Project {
    #title;
    #description;
    #date;
    #tasks;

    constructor(title, description, date, tasks) {
        this.#title = title;
        this.#description = description;
        this.#date = date; 
        this.#tasks = tasks;
    }

    saveProject() {
        return database.execute(`
        INSERT INTO projects (title, description, date, tasks) VALUES (?, ?, ?, ?)
        `, [this.#title, this.#description, this.#date, this.#tasks]);
    }

    static removeProject(id) {
        return database.execute(`DELETE FROM projects WHERE id='${id}'`);
    }

    static updateProject(updatedProject) {
        console.log(updatedProject);
        return database.execute(`UPDATE projects
        SET title='${updatedProject.projectName}',
        description='${updatedProject.projectDescription}',
        date='${updatedProject.projectDate}'
        WHERE id = ${updatedProject.projectId}`);
    }

    static fetchAllProjects () {
        return database.execute('SELECT * FROM projects');
    }

    static readFile(callBack) {
        fs.readFile(filePath, (error, fileContent) => {
            let parsedFileContent = [];
            if(error) {
                console.log("Error reading file: ", error);
                return;
            }
            parsedFileContent = JSON.parse(fileContent);
            callBack(parsedFileContent);
            
        });
    }

    static writeFile(content, callBack) {
        fs.writeFile(filePath, JSON.stringify(content), callBack);
    }


    //getters and setters
    set title(title) {
        this.#title = title;
    } 

    set description(description) {
        this.#description = description;
    }

    set date(date) {
        this.#date = date;
    }

    set tasks(tasks) {
        this.tasks = tasks;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get date() {
        return this.#date;
    }

    get tasks() {
        return this.#tasks;
    }
}