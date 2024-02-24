import { forwardRef } from 'react';
import './LowerSection.css'

const LowerSection = forwardRef(({
    selectedProject,
    handleAddTaskClick,
    handleClearTaskClick,
    handleTaskCompleteClick}, ref) => {
    return (
        <div className='lower-section'>
            <span className='center'><h1>Tasks</h1></span>
            <label>Add task</label>
            <div className='add-task-controls'>
                <input ref={ref} type='text' />
                <button onClick={handleAddTaskClick}>Add task</button>
            </div>
            <ol>
                {selectedProject.tasks.map((task) => {
                    return <li key={task.id}>
                        {task.taskDone && <span>✅</span>}
                        <label className={task.taskDone ? 'task-done' : ''} >{task.taskName}</label>
                        <div className='task-control-buttons'>
                            <button onClick={() => handleClearTaskClick(task.id)}>Clear</button>
                            {!task.taskDone && <button className='green-button' onClick={() => handleTaskCompleteClick(task.id)}>Task done</button>}
                        </div>
                    </li>
                })}
            </ol>
        </div>
    );
});
 
export default LowerSection;