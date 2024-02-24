import { useRef } from 'react';
import './EditSelectedProject.css'
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from '../store/store';
import { addNewTaskUrl, clearTaskUrl, addTaskDone } from '../serverEndPoints';
import UpperSection from './UpperSection';
import LowerSection from './LowerSection';

const EditSelectedProject = () => {
    const taskRef = useRef();
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects);
    const selectedProjectId = useSelector(state => state.currentProject.currentProject);
    const selectedProject = projects.find(project => project.id === selectedProjectId);

    function handleAddTaskClick() {
        const task = taskRef.current.value;
        if(!task) return;

        dispatch(projectsActions.addProjectTask({newTask: task, projectId: selectedProjectId}));
        
        fetch(addNewTaskUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskName: task,
                taskDone: false,
                projectId: selectedProjectId,
            }),
        })
        .then(response => response.json())
        .then(() => {
            console.log("POST SUCCESS");
        })
        .catch(error => {
            console.log("Error in POST: ", error);
        })
        taskRef.current.value = "";
    }

    function handleClearTaskClick(taskId) {
        dispatch(projectsActions.clearProjectTask({taskId: taskId, projectId: selectedProjectId}));
        fetch(clearTaskUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({taskId: taskId, projectId: selectedProjectId})
        })
        .then(response => response.json())
        .then(() => {
            console.log("fetch in ClearTask succeeded");
        })
        .catch(error => {
            console.log("Error in fetch at clearTask: ", error);
        });
    }

    function handleTaskCompleteClick(taskId) {
        dispatch(projectsActions.addTaskComplete({taskId: taskId, projectId: selectedProjectId}));
        fetch(addTaskDone, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskId: taskId,
                taskDone: true,
                projectId: selectedProjectId
            })
        });
    }

    return (
        <section>
            <UpperSection selectedProject={selectedProject}/>
            <LowerSection
            selectedProject={selectedProject}
            handleAddTaskClick={handleAddTaskClick}
            handleClearTaskClick={handleClearTaskClick}
            handleTaskCompleteClick={handleTaskCompleteClick}
            ref={taskRef}
            />
        </section>
    );
}
 
export default EditSelectedProject;