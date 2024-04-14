import { useEffect, useState } from 'react';
import './Sidebar.css'
import HamburgerIconWhite from '/HamburgerWhite.svg'
import { useDispatch, useSelector } from 'react-redux';
import { windowManagerActions, projectsActions } from '../store/store';
import { getAllProjectsUrl } from '../serverEndPoints';
import { selectedProjectActions } from '../store/store';

const Sidebar = () => {
    const [dataVisible, setDataVisible] = useState('false');
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects);
    const [loadingProjects, setLoadingProjects] = useState(true);
    
    function handleMobileToggleClick() {
        if(dataVisible === 'false')
            setDataVisible('true');
        else
            setDataVisible('false')
    }

    function handleCreateNewProjectClick() {
        dispatch(windowManagerActions.createNewProject());
        handleMobileToggleClick();
    }

    function handleSelectProjectClick(projectId) {
        dispatch(windowManagerActions.editProject());
        dispatch(selectedProjectActions.selectProject(projectId));
        handleMobileToggleClick();
    }

    async function getRecentProjects() {
        try {
            setLoadingProjects(true);
            const promise = await fetch(getAllProjectsUrl);
            const data = await promise.json();

            if(!promise.ok)
                throw new Error("Error getting recent projects");
            dispatch(projectsActions.setProjects(data));
        } catch(error) {
            console.log("Error getting recent projects: ", error);
        }
        setLoadingProjects(false);
    }

    useEffect(() => {
        getRecentProjects();
        setLoadingProjects(false);
    }, []);
    return (
        <nav>
            <button
            onClick={handleMobileToggleClick}
            className='mobile-nav-toggle'
            aria-controls='primary-navigation'
            aria-expanded='false'
            >
                <span className='sr-only'>
                    <img src={HamburgerIconWhite}/>
                </span>
            </button>
            
            <ul
            data-visible={dataVisible}
            className="primary-navigation"
            >
                <h2>Projects</h2>
                {loadingProjects && <p>Loading Projects</p>}
                {projects.map(project => {
                    return <li key={project.id}>
                        <button
                            onClick={() => handleSelectProjectClick(project.id)}>
                            {project.title}
                        </button>
                    </li>
                })}
                <button onClick={handleCreateNewProjectClick}>Add new Project</button>
            </ul>
        </nav>
    );
}
 
export default Sidebar;