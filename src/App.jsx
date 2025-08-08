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
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 3000)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          index
          element={
            loading 
            ? <Home
                loading={loading}
              /> 
            : <LoadingPage/>}
        />
        <Route/>
        <Route/>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
