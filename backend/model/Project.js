const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../', 'data', 'data.json');

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
        const projectData = {
            projectName: this.#title,
            description: this.#description,
            date: this.#date,
            tasks: this.#tasks,
        }
        fs.readFile(filePath, (error, fileContent) => {
            let newArray = [];
            if(!error) {
                newArray = JSON.parse(fileContent);
            }

            if(newArray.length === 0)
                projectData.id = 1;
            else
                projectData.id = newArray.length + 1;

            newArray.push(projectData);
            fs.writeFile(filePath, JSON.stringify(newArray), (error) => {
                if(error) {
                    console.log("ERROR WRITING FILE");
                }
            });
        });
    }

    static fetchAllProjects (callBack) {
        fs.readFile(filePath, (error, data) => {
            let allProjects;
            if(!error) {
                allProjects = JSON.parse(data);
            }
            callBack(allProjects); // Does error checking in the callback
        });
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