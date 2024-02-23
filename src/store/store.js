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

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialProjectsState,
    reducers: {
        setProjects(state, action) {
            console.log(action.payload);
            state.projects = action.payload;
        }
    } 
});

const store = configureStore({
    reducer: {
        windowManager: windowManagerSlice.reducer,
        projects: projectsSlice.reducer
    }
});

export const windowManagerActions = windowManagerSlice.actions;
export const projectsActions = projectsSlice.actions;

export default store;