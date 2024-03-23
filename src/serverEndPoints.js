export const addProjectUrl = 'http://localhost:3000/add-new-project';
export const getAllProjectsUrl = 'http://localhost:3000/get-all-projects';
export const addNewTaskUrl = 'http://localhost:3000/add-new-task';
export const clearTaskUrl = 'http://localhost:3000/clear-task';
export const addTaskDoneUrl = 'http://localhost:3000/task-done';
export const addPriorityUrl = 'http://localhost:3000/add-priority';
export const sortByPriorityUrl = 'http://localhost:3000/sort-by-priority';
export const editProjectDetailsUrl = 'http://localhost:3000/edit-project';
export const clearProjectUrl = 'http://localhost:3000/clear-project';

export async function fetchPost(endPoint, data) {
    try {
        const promise = await fetch(endPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    
        const response = await promise.json();
    
        if(!promise.ok)
            throw new Error("Error in fetchPost");

        console.log(response);
        
    } catch(error) {
        console.log("Error in fetchPost: ", error);
    }
}