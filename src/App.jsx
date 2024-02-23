import './App.css'
import NoProjectSelected from './components/NoProjectSelected'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useSelector } from 'react-redux'
import CreateNewProject from './components/CreateNewProject'
import EditSelectedProject from './components/EditSelectedProject'
import { useState } from 'react'

function App() {

  const windowManager = useSelector(state => state.windowManager.windowManager);
  const [selectedProject, setSelectedProject] = useState();
  return (
    <div id="app">
      <Header/>
      <Sidebar setSelectedProject={setSelectedProject}/>
      {windowManager.noProjectSelected && <NoProjectSelected/>}
      {windowManager.createNewProject && <CreateNewProject/>}
      {windowManager.editProject && <EditSelectedProject selectedProject={selectedProject}/>}
    </div>
  )
}

export default App
