import React from 'react'
import CircularProgressBar from './CircularProgressBar'
import { useNavigate } from 'react-router-dom'
import { getTasksByProjectId, getProjectById } from '../../database/tasksOperations'


const ProjectCard = ({name, date, id, percentage, total, remaining}) => {

  // navigation
  const navigate = useNavigate()

  const handleNavigate = async () => {
    
    const getTasks = await getTasksByProjectId(id)
    const getProject = await getProjectById(id)

    navigate(`/EditProject/${id}`, {
      state: {
        getTasks,
        getProject
      }
    })

  }

  return (
    <div
      onClick={() => handleNavigate()}
      className='bg-BG p-4 flex cursor-pointer flex-row gap-3 rounded'
    >
        <CircularProgressBar
          size={70}
          strokeWidth={8.5}
          progress={percentage}
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
              {name}
            </h1>
            <p
              className='font-medium text-[0.65rem] text-DText'
            >
              {remaining} more tasks to go
            </p>
          </div>

          <div
            className='flex flex-row items-center justify-between h-full w-full'
          >
            <div
              className='flex flex-row items-end justify-end gap-1 text-[0.60rem] font-medium text-DText'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"/><path fill="currentColor" fill-rule="evenodd" d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clip-rule="evenodd"/></svg>
              <input 
                className='border-none'
                value={date}
                readOnly
                type="date" 
              />
            </div>
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