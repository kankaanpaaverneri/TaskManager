import { configureStore, createSlice } from "@reduxjs/toolkit";
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

function getCurrentProjectIndex(projects, projectId) {
    const projectIndex = projects.findIndex(project => {
        return project.id === projectId;
    });
    return projectIndex;
}

function regenerateIds(tasks) {
    tasks.forEach((task, index) => {
        task.id = index;
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
                    id: state.projects[projectIndex].tasks.length + 1
                }
            ];

            regenerateIds(state.projects[projectIndex].tasks);
        },
        
        clearProjectTask(state, action) {
            const {taskId, projectId} = action.payload

            const projectIndex = getCurrentProjectIndex(state.projects, projectId);

            //Remove task
            if(state.projects[projectIndex].tasks.length > 1) {
                state.projects[projectIndex].tasks.splice(taskId, 1);
            } else {
                state.projects[projectIndex].tasks.pop();
            }
            
            regenerateIds(state.projects[projectIndex].tasks);
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