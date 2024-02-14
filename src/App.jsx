import './App.css'
import NoProjectSelected from './components/NoProjectSelected'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useSelector } from 'react-redux'
import CreateNewProject from './components/CreateNewProject'


function App() {

  const windowManager = useSelector(state => state.windowManager);
  console.log(windowManager);

  return (
    <div id="app">
      <Header/>
      <Sidebar/>
      {windowManager.noProjectSelected && <NoProjectSelected/>}
      {windowManager.createNewProject && <CreateNewProject/>}
    </div>
  )
}

export default App
