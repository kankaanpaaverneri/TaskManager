import { useDispatch } from "react-redux";
import { windowManagerActions } from "../store/store";
import './CreateNewProject.css'
import { useRef } from "react";

const CreateNewProject = () => {

    const dispatch = useDispatch();

    const projectName = useRef();
    const description = useRef();
    const date = useRef();

    function goToNoProjectSelected() {
        dispatch(windowManagerActions.noProjectSelected())
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(projectName.current.value);
        console.log(description.current.value);
        console.log(date.current.value);
        console.log("Send data to backend...");
        goToNoProjectSelected();
    }

    return (
        <section>
            <h1>Create new project</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Project name</label>
                <input ref={projectName} type="text" name="name" />
                <label htmlFor="description">Description</label>
                <textarea ref={description} name="description"></textarea>
                <label htmlFor="date">Due date</label>
                <input ref={date} type="date" name="date" />
                <div className="form-actions">
                    <button onClick={goToNoProjectSelected}>Cancel</button>
                    <button className="dark-button" type="submit">Add project</button>
                </div>
            </form>
        </section>
    );
}
 
export default CreateNewProject;