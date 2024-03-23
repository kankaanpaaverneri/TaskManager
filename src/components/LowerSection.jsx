import { forwardRef } from 'react';
import './LowerSection.css'
import Table from './Table';
import { useDispatch } from 'react-redux';
import { projectsActions } from '../store/store';
import { clearTaskUrl, addTaskDoneUrl, fetchPost } from '../serverEndPoints';

const LowerSection = forwardRef(({
    selectedProject,
    handleAddTaskClick,
    }, ref) => {
        const dispatch = useDispatch();

    function handleClearTaskClick(taskId) {
        dispatch(projectsActions.clearProjectTask({taskId: taskId, projectId: selectedProject.id}));

        const data = {taskId: taskId, projectId: selectedProject.id};

        fetchPost(clearTaskUrl, data);
    }

    function handleTaskCompleteClick(taskId) {
        dispatch(projectsActions.addTaskComplete({taskId: taskId, projectId: selectedProject.id}));

        const data = {
            taskId: taskId,
            taskDone: true,
            taskPriority: 0,
            projectId: selectedProject.id
        }

        fetchPost(addTaskDoneUrl, data);
    }
    
    return (
        <div className='lower-section'>
            <span className='center'><h1>Tasks</h1></span>
            <label>Add task</label>
            <div className='add-task-controls'>
                <input ref={ref} type='text' />
                <button onClick={handleAddTaskClick}>Add task</button>
            </div>
            <Table
            selectedProject={selectedProject}
            handleClearTaskClick={handleClearTaskClick}
            handleTaskCompleteClick={handleTaskCompleteClick}
            />
        </div>
    );
});
 
export default LowerSection;