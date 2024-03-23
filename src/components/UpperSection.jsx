import { useRef, useState } from 'react';
import './UpperSection.css'
import { useDispatch } from 'react-redux';
import { projectsActions } from '../store/store';

const UpperSection = ({selectedProject}) => {
    const [edit, setEdit] = useState(false);

    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();
    const projectDateRef = useRef();

    const dispatch = useDispatch();

    function editProjectDetails() {
        if(edit) {
            const data = {
                projectId: selectedProject.id,
                projectName: projectNameRef.current.value === '' ?
                selectedProject.projectName : projectNameRef.current.value,
                projectDescription: projectDescriptionRef.current.value === '' ?
                selectedProject.description : projectDescriptionRef.current.value,
                projectDate: projectDateRef.current.value === '' ?
                selectedProject.date : projectDateRef.current.value,
            }

            if(data.projectName === '')
                data.projectName = 'Ei projekti nimeä';

            if(data.projectDescription === '')
                data.projectDescription = 'Ei kuvausta';

            if(data.projectDate === '')
                data.projectDate = 'Ei deadlineä määritelty';
            
            dispatch(projectsActions.editProjectDetails(data));
            setEdit(() => false);
        }
        else {
            setEdit(() => true);
        }
    }

    return (
        <div className='upper-section'>
                {!edit && <div className='project-details'>
                    {selectedProject.projectName ?
                    <h1>{selectedProject.projectName}</h1> :
                    <h1>Ei projekti nimeä</h1>}
                    {selectedProject.description ?
                    <h2>{selectedProject.description}</h2> :
                    <h2>Ei kuvausta</h2>}
                    {selectedProject.date ?
                    <h3>{selectedProject.date}</h3> :
                    <h3>Ei deadlineä määritelty</h3>}
                </div>}
                {edit && <div className='project-details'>
                    <input ref={projectNameRef} placeholder={selectedProject.projectName === '' ?
                    'Ei projekti nimeä' : selectedProject.projectName} />
                    <input ref={projectDescriptionRef} placeholder={selectedProject.description === '' ?
                    'Ei kuvausta' : selectedProject.description}/>
                    <input ref={projectDateRef} placeholder={selectedProject.date === '' ?
                    'Ei päivämäärää' : selectedProject.date} />
                    </div>}
                <div id='control-buttons'>
                    <button onClick={editProjectDetails}>{edit ? 'Save' : 'Edit'}</button>
                    <button>Done</button>
                </div>
        </div>
    );
}
 
export default UpperSection;