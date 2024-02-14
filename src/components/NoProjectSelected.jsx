import { useDispatch } from 'react-redux';
import { windowManagerActions } from '../store/store';
import './NoProjectSelected.css'

const NoProjectSelected = () => {

    const dispatch = useDispatch();

    function handleCreateNewProjectClick() {
        dispatch(windowManagerActions.createNewProject());
    }

    return (
        <section id="no-project-selected">
            <h1>No project selected</h1>
            <button onClick={handleCreateNewProjectClick}>Create new project</button>
        </section>
    );
}
 
export default NoProjectSelected;