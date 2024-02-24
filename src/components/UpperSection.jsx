import './UpperSection.css'

const UpperSection = ({selectedProject}) => {
    return (
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
                    <button>Done</button>
                </div>
        </div>
    );
}
 
export default UpperSection;