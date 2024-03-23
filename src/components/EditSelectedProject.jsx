import { useRef } from 'react';
import './EditSelectedProject.css'
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from '../store/store';
import { addNewTaskUrl, fetchPost } from '../serverEndPoints';
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
        
        const data = {
            taskName: task,
            taskDone: false,
            projectId: selectedProjectId,
        }
        
        fetchPost(addNewTaskUrl, data);

        taskRef.current.value = "";
    }

    return (
        <section>
            <UpperSection selectedProject={selectedProject}/>
            <LowerSection
            selectedProject={selectedProject}
            handleAddTaskClick={handleAddTaskClick}
            ref={taskRef}
            />
        </section>
    );
}
 
export default EditSelectedProject;