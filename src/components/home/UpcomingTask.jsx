import React from 'react'
import { getTasksByProjectId, getProjectById } from '../../database/tasksOperations'
import { useNavigate } from 'react-router-dom'

const UpcomingTask = ({id, title, description, date, projectId}) => {

    const navigate = useNavigate()

    const handleNavigate = async () => {
      
      if (projectId !== null) {
        const getTasks = await getTasksByProjectId(projectId)
        const getProject = await getProjectById(projectId)
        console.log("this ran")

        navigate(`/EditProject/${projectId}`, {
          state: {
            getTasks,
            getProject
          }
        })
      }
    }

  return (
    <div
      className='p-4 bg-BG rounded flex flex-col gap-4 '
      onClick={() => handleNavigate()}
    >
      <div
        className='flex flex-col gap-2 '
      >
          <h1
              className='font-semibold'
          >
              {title}
          </h1>
          <p
              className='text-xs text-CText/70 pr-4 min-h-12'
          >
            {description}
          </p>
      </div>
      <div
          className='flex flex-row items-center justify-between'
      >  
          <p
            className='flex flex-row items-end justify-end gap-1 text-[0.65rem] font-medium text-DText'
          >
            <svg className='' xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v1h18v-1c0-1.1-.9-2-2-2Z"></path><path d="m3,20c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2v-12H3v12Zm12-8h2v2h-2v-2Zm0,4h2v2h-2v-2Zm-4-4h2v2h-2v-2Zm0,4h2v2h-2v-2Zm-4-4h2v2h-2v-2Zm0,4h2v2h-2v-2Z"></path>
            </svg>
            <input 
              type="date" 
              value={date}
              readOnly
            />
          </p>
          <svg className={`${projectId !== null ? "block" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M6 13h6v4l6-5-6-5v4H6z"></path>
          </svg>   
      </div>
    </div>
  )
}

export default UpcomingTask