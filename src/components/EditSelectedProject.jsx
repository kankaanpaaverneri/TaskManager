import './EditSelectedProject.css'

const EditSelectedProject = ({selectedProject}) => {
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
                <h1>Tasks</h1>
            </div>
            
        </section>
    );
}
 
export default EditSelectedProject;