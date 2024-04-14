import { configureStore, createSlice } from "@reduxjs/toolkit";
import { quicksort } from "../quicksort";
import { fetchPost, sortByPriorityUrl, editProjectDetailsUrl, clearProjectUrl } from "../serverEndPoints";
const initiaWindowState = {
    windowManager: {
        noProjectSelected: true,
        createNewProject: false,
        editProject: false,
    }
};

const windowManagerSlice = createSlice({
    name: 'windowmanager',
    initialState: initiaWindowState,
    reducers: {
        noProjectSelected({windowManager}) {
            windowManager.noProjectSelected = true;
            windowManager.createNewProject = false;
            windowManager.editProject = false;
        },
        createNewProject({windowManager}) {
            windowManager.noProjectSelected = false;
            windowManager.createNewProject = true;
            windowManager.editProject = false;
        },
        editProject({windowManager}) {
            windowManager.noProjectSelected = false;
            windowManager.createNewProject = false;
            windowManager.editProject = true;
        }
    }
});

const initialProjectsState = {
    projects: []
}

//Helper functions
function getCurrentProjectIndex(projects, projectId) {
    const projectIndex = projects.findIndex(project => {
        return project.id === projectId;
    });
    return projectIndex;
}

function regenerateArrayIds(array) {
    array.forEach((element, index) => {
        element.id = index+1;
    });
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialProjectsState,
    reducers: {
        setProjects(state, action) {
            state.projects = action.payload;
        },
        addProjectTask(state, action) {
            const {newTask, projectId} = action.payload;

            const projectIndex = getCurrentProjectIndex(state.projects, projectId);

            state.projects[projectIndex].tasks = [
                ...state.projects[projectIndex].tasks,
                {
                    taskName: newTask,
                    taskDone: false,
                    taskPriority: 0,
                    id: state.projects[projectIndex].tasks.length + 1
                }
            ];

            regenerateArrayIds(state.projects[projectIndex].tasks);
        },
        
        clearProjectTask(state, action) {
            const {taskId, projectId} = action.payload;

            const projectIndex = getCurrentProjectIndex(state.projects, projectId);

            //Remove task
            const filteredTasks = state.projects[projectIndex].tasks.filter(task => {
                if(task.id !== taskId)
                    return task;
            })

            state.projects[projectIndex].tasks = filteredTasks;
            
            regenerateArrayIds(state.projects[projectIndex].tasks);
        },

        addTaskComplete(state, action) {
            const {taskId, projectId} = action.payload;

            const projectIndex = state.projects.findIndex(project => {
                return project.id === projectId;
            });

            state.projects[projectIndex].tasks.forEach(task => {
                if(task.id === taskId) {
                    task.taskDone = true;
                }
            })
        },

        addTaskPriority(state, action) {
            const {taskId, priority, projectId} = action.payload;
            
            const projectIndex = state.projects.findIndex(project => {
                return project.id === projectId;
            });

            state.projects[projectIndex].tasks.forEach(task => {
                if(task.id === taskId)
                    task.taskPriority = priority;
            });
        },
        sortByPriority(state, action) {
            const {projectId, tasks} = action.payload;

            let sortedArray = [...tasks];
            quicksort(sortedArray, 0, sortedArray.length - 1);
            const projectIndex = state.projects.findIndex(project => {
                return project.id === projectId;
            });

            state.projects[projectIndex].tasks = [...sortedArray];
            fetchPost(sortByPriorityUrl, {projectId, tasks: sortedArray});
        },
        editProjectDetails(state, action) {
            const {
                projectId,
                projectName,
                projectDescription,
                projectDate
            } = action.payload;

            const projectIndex = state.projects.findIndex(project => {
                return project.id === projectId;
            })

            state.projects[projectIndex].title = projectName;
            state.projects[projectIndex].description = projectDescription,
            state.projects[projectIndex].date = projectDate;

            fetchPost(editProjectDetailsUrl, {projectId, projectName, projectDescription, projectDate});
        },
        clearProject(state, action) {
            const {projectId} = action.payload;

            const projectDone = state.projects.find(project => project.id === projectId);

            const filteredProjects = state.projects.filter((project) => {
                if(project.id !== projectId)
                    return project;
            });

            state.projects = filteredProjects;

            regenerateArrayIds(state.projects);

            fetchPost(clearProjectUrl, projectDone);
        }
    } 
});

const selectedProjectInitialState = {
    currentProject: 0
}

const selectedProjectSlice = createSlice({
    name: "selectedProject",
    initialState: selectedProjectInitialState,
    reducers: {
        selectProject(state, action) {
            state.currentProject = action.payload;
        }
    }
});

const store = configureStore({
    reducer: {
        windowManager: windowManagerSlice.reducer,
        projects: projectsSlice.reducer,
        currentProject: selectedProjectSlice.reducer
    }
});

export const windowManagerActions = windowManagerSlice.actions;
export const projectsActions = projectsSlice.actions;
export const selectedProjectActions = selectedProjectSlice.actions;

export default store;