import React from 'react'
import CircularProgressBar from './CircularProgressBar'


const ProjectCard = () => {
  return (
    <div
      className='bg-BG p-4 flex flex-row gap-3 rounded'
    >
        <CircularProgressBar
          size={70}
          strokeWidth={8.5}
          progress={75}
        />
        
        <div
          className='w-full h-full flex flex-col items-start justify-start gap-3'
        >
          <div
            className='flex flex-col gap-0.5 w-full h-full'
          >
            <h1
              className='font-bold text-sm'
            >
              Todo App Project
            </h1>
            <p
              className='font-medium text-[0.65rem] text-DText'
            >
              29 more tasks to go
            </p>
          </div>

          <div
            className='flex flex-row items-center justify-between h-full w-full'
          >
            <p
              className='flex flex-row items-center justify-end gap-1 text-[0.60rem] font-medium text-DText'
            >
              <svg className='' xmlns="http://www.w3.org/2000/svg" width="14" height="14"  
              fill="currentColor" viewBox="0 0 24 24" >
              <path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v1h18v-1c0-1.1-.9-2-2-2Z"></path><path d="m3,20c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2v-12H3v12Zm12-8h2v2h-2v-2Zm0,4h2v2h-2v-2Zm-4-4h2v2h-2v-2Zm0,4h2v2h-2v-2Zm-4-4h2v2h-2v-2Zm0,4h2v2h-2v-2Z"></path>
              </svg>
              22/07/25
            </p>
            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
              fill="currentColor" viewBox="0 0 24 24" >
              <path d="M6 13h6v4l6-5-6-5v4H6z"></path>
            </svg>            
          </div>

        </div>

    </div>
  )
}

export default ProjectCard