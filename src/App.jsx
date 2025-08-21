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
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { getAllTasks, getAllProjects } from './database/tasksOperations'

function App() {

  // toggles 
  const [loading, setLoading] = useState(false) // lets the application load

  // app data
  const [currentProjects, setCurrentProjects] = useState(null)
  const [currentTasks, setCurrentTasks] = useState(null)

  // lets all the stuff load first
  useEffect(() => {
    setTimeout(() => {
      setLoading(loadData())
    }, 3000)
  }, [])

  const loadData = async () => {
    
    const tasks = await getAllTasks()
    const projects = await getAllProjects()

    setCurrentTasks(tasks)
    setCurrentProjects(projects)

    return true

  }


  useEffect(() => {
    console.log("tasks: ", currentTasks)
    console.log("projects", currentProjects)
  }, [currentProjects, currentTasks])


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
            path={'/EditProject'}
            element={
              loading
              ? <EditProject/>
              : <LoadingPage/>
            }  
          />
        </Routes>        
        <Navbar
          loading={loading}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
