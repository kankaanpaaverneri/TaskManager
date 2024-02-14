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

const store = configureStore({
    reducer: windowManagerSlice.reducer
});

export const windowManagerActions = windowManagerSlice.actions;

export default store;