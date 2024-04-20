import { useDispatch } from 'react-redux';
import { projectsActions } from '../store/store';
import { addPriorityUrl, fetchPost } from '../serverEndPoints';
import './Table.css'

const Table = ({selectedProject, handleClearTaskClick, handleTaskCompleteClick}) => {
    const dispatch = useDispatch();
    function sortByPriority() {
        const data = {
            projectId: selectedProject.id,
            tasks: selectedProject.tasks
        };
        dispatch(projectsActions.sortByPriority(data));
    }

    function handlePriorityClick(event, taskId) {
        const taskPriority = Number(event.target.value);
        console.log(taskPriority);

        const data = {taskId, taskPriority, projectId: selectedProject.id}
        dispatch(projectsActions.addTaskPriority(data));
        fetchPost(addPriorityUrl, data);
    }

    return (
        <table>
            <thead>
                <tr>
                    <td>Priority</td>
                    <td>Task</td>
                    <td>Options</td>
                </tr>
            </thead>
            <tbody>
                {selectedProject.tasks.map(task => {
                    return (
                        <tr key={task.taskId}>
                            <td>
                                {
                                !task.taskDone && <input
                                className='priority'
                                type='number'
                                value={task.taskPriority === 0 ? "" : task.taskPriority}
                                onChange={(e) => handlePriorityClick(e, task.taskId)}/>
                                }
                            </td>
                            <td>
                                <p className={task.taskDone ? 'task-done' : ''}>
                                    {task.taskDone && <span>✅&nbsp;</span>}{task.taskName}
                                </p>
                            </td>
                            <td>
                                <button onClick={() => handleClearTaskClick(task.taskId)}>Clear</button>
                                {!task.taskDone &&
                                <button
                                className='green-button'
                                onClick={() => handleTaskCompleteClick(task.taskId)}>
                                    Task done
                                </button>
                                }
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td>
                        <button onClick={sortByPriority}>Sort by priority</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
 
export default Table;