import { useRef } from 'react';
import './EditSelectedProject.css'
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from '../store/store';
import { addNewTaskUrl } from '../serverEndPoints';

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

    function clearTask(taskId) {
        dispatch(projectsActions.clearProjectTask({taskId: taskId, projectId: selectedProjectId}));
    }

    return (
        <section>
            <div className='upper-section'>
                <div id='project-details'>
                    {selectedProject.projectName ?
                    <h1>{selectedProject.projectName}</h1> : <h1>Ei projekti nimeä</h1>}
                    {selectedProject.description ?
                    <h2>{selectedProject.description}</h2> : <h2>Ei kuvausta</h2>}
                    {selectedProject.date ?
                    <h3>{selectedProject.date}</h3> : <h3>Ei deadlineä määritelty</h3>}
                </div>
                <div id='control-buttons'>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className='lower-section'>
                <span className='center'><h1>Tasks</h1></span>
                <label>Add task</label>
                <div className='add-task-controls'>
                    <input ref={taskRef} type='text' />
                    <button onClick={handleAddTaskClick}>Add task</button>
                </div>
                <ol>
                    {selectedProject.tasks.map((task) => {
                        return <li key={task.id}>
                            <label>{task.taskName}</label>
                            <button onClick={() => clearTask(task.id)}>Clear</button>
                        </li>
                    })}
                </ol>
            </div>
            
        </section>
    );
}
 
export default EditSelectedProject;