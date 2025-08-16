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
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {getProjects, getTasks} from './database/db'


function App() {

  // database functions
  // const { isInitialised, projects, tasks } = useDatabase()

  // toggles 
  const [loading, setLoading] = useState(false)

  // tasks details
  const [currentProjects, setCurrentProjects] = useState(getProjects())
  const [currentTasks, setCurrentTasks] = useState(getTasks())
 
  // lets all the stuff load first
  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
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
                /> 
              : <LoadingPage/>}
          />
          <Route
            path={"/newProject"}
            element={
              loading
              ? <Project
                  projects={currentProjects}
                  tasks={currentTasks}
                  loading={loading}
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
                  projects={currentProjects}
                  tasks={currentTasks}
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
