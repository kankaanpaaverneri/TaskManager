import { useDispatch } from "react-redux";
import { windowManagerActions, projectsActions } from "../store/store";
import './CreateNewProject.css'
import { useRef, useState } from "react";
import { addProjectUrl, getAllProjectsUrl } from "../serverEndPoints";

const CreateNewProject = () => {

    const dispatch = useDispatch();

    const projectName = useRef();
    const description = useRef();
    const date = useRef();

    const [error, setError] = useState('');

    async function goToNoProjectSelected() {
        dispatch(windowManagerActions.noProjectSelected());
        try {
            const promise = await fetch(getAllProjectsUrl);
            const data = await promise.json();
            if(!promise.ok)
                throw new Error("Error when going to noProjectSelected");

            dispatch(projectsActions.setProjects(data));

        } catch(error) {
            console.log("Error goToNoProjectSelected: ", error);
            setError(error);
        }
        
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            projectName: projectName.current.value,
            description: description.current.value,
            date: date.current.value,
        }

        fetch(addProjectUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(response.ok) {
                console.log("Send successful: ", response);
                goToNoProjectSelected();
            } else {
                console.log("Error sending data to backend response status: ", response.status);
                setError(`HTTP Error ${response.status}: ${response.statusText}`);
            }
        })
        .catch(error => {
            console.log("Error sending data... to backend: ", error);
            setError(error);
        });
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
            {error !== '' &&
                <h1>{error.message}</h1>
            }
        </section>
    );
}
 
export default CreateNewProject;