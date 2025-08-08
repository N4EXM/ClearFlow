import React from 'react'

const LoadingPage = () => {
  return (
    <div
        className='flex items-center gap-3 font-poppins justify-center h-full min-h-screen w-full bg-BG text-CText'
    >
        <svg className='text-Pr' xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M5 19V5h14v14z"></path><path d="M7 7h2v2H7zM11 7h6v2h-6zM7 11h2v2H7zM11 11h6v2h-6zM7 15h2v2H7zM11 15h6v2h-6z"></path>
        </svg>
        <h1
            className='text-2xl font-bold'
        >
            Clear<span className='text-Pr'>Flow</span>
        </h1>
    </div>
  )
}

export default LoadingPage