/**
 * 
 * This is the main component which contains all the data and routes to other pages
 * 
 * @
 * 
 */


import { useEffect, useState } from 'react'
import './App.css'
import LoadingPage from './pages/LoadingPage'
import Home from './pages/Home'
import Project from './pages/Project'
import EditProject from './pages/EditProject'
import CalendarPage from './pages/CalendarPage'
import Navbar from './components/Navbar'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import { getAllTasks, getAllProjects, getTaskStatistics} from './database/tasksOperations'

function App() {

  // toggles 
  const [loading, setLoading] = useState(false) // lets the application load

  // app data
  const [currentProjects, setCurrentProjects] = useState([])
  const [currentTasks, setCurrentTasks] = useState([])

  const loadData = async () => {
    
    const tasks = await getAllTasks()
    const projects = await getAllProjects()

    setCurrentTasks(tasks)
    setCurrentProjects(projects)

    return true

  }

  // lets all the stuff load first
  useEffect(() => {
    setTimeout(() => {
      setLoading(loadData())
    }, 3000)
  }, [])

  return (
    <div
      className='relative '
    >
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            index
            element={
              loading 
              ? <Home
                  loading={loading}
                  projects={currentProjects}
                  tasks={currentTasks}
                  loadData={loadData}
                /> 
              : <LoadingPage/>}
          />
          <Route
            path={"/newProject"}
            element={
              loading
              ? <Project
                  currentProjects={currentProjects}
                  currentTasks={currentTasks}
                  setCurrentTasks={setCurrentTasks}
                  loading={loading}
                  loadData={loadData}
                />
              : <LoadingPage/>
            }
          />
          <Route
            path={'/CalendarPage'}
            element={
              loading
              ? <CalendarPage
                  loading={loading}
                  currentProjects={currentProjects}
                  currentTasks={currentTasks}
                  setCurrentTasks={setCurrentTasks}
                  loadData={loadData}
                />
              : <LoadingPage/>
            }
          />
          <Route
            path={'/EditProject/:projectId'}
            element={
              loading
              ? <EditProject
                  currentProjects={currentProjects}
                  currentTasks={currentTasks}
                  loadData={loadData}
                />
              : <LoadingPage/>
            }  
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>        
        <Navbar
          loading={loading}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
