import React from 'react'
import { useNavigate } from 'react-router-dom'
import NewTaskCard from '../components/Project/NewTaskCard'
import ProjectTaskCard from '../components/Project/ProjectTaskCard'
import { useEffect, useState} from 'react'

const Project = ({loading}) => {

  const navigate = useNavigate()
  const [isWarningBoxActive, setIsWarningBoxActive] = useState(false) // activates the warning dialogue box
  const [isNewTaskActive, setIsNewTaskActive] = useState(false) // activates the new task card for the project

  // project details
  const [ProjectTitle, setProjectTitle] = useState("")
  const [projectDueDate, setProjectDueDate] = useState("")
  
  // tasks details
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDesc, setTaskDesc] = useState("")
  const [taskDueDate, setTaskDueDate] = useState("")
  const [tasks, setTasks] = useState([])

  const handleAddingTasks = (title, desc, date, formattedDate) => {
    const newTask = {
      title: title,
      desc: desc,
      date: date,
      formattedDate: formattedDate
    }
    setTasks([...tasks, newTask])
    console.log(tasks)
  }

  return (
    <div
      className={`relative font-poppins text-CText`}
    >

      <div
        className={`${isWarningBoxActive ? "flex" : "hidden"} flex-col gap-5 p-3 pt-4 bg-BGS rounded-md border border-Pr absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-3/4 min-h-1/5 h-fit opacity-100 duration-300`}
      >
        <div
          className='flex flex-col gap-3 items-center'
        >
          <svg className='p-2 bg-Pr rounded-full' xmlns="http://www.w3.org/2000/svg" width="48" height="48"  
            fill="currentColor" viewBox="0 0 24 24" >
            <path d="M11 7h2v6h-2zM11 15h2v2h-2z"></path><path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8"></path>
          </svg>
          <div
            className='flex flex-col gap-1.5'
          >
            <p 
              className='text-center text-lg font-semibold'
            >
              Are you want to exit?
            </p>
            <p
              className='text-center text-CText/60 text-xs'
            >
              All of you data will be lost
            </p>
          </div>
        </div>
        <div
          className='flex flex-row items-center gap-2'
        >
          <button
            onClick={() => setIsWarningBoxActive(false)}
            className='font-medium w-1/2 p-2 border border-Pr rounded-md text-sm bg-BG'
          >
            Cancel
          </button>
          <button
            onClick={() => navigate(-1)}
            className='w-1/2 p-2 border bg-rose-500 border-rose-500 rounded-md text-sm font-medium'
          >
            Exit
          </button>
        </div>
      </div>

      <div
        className={`${isWarningBoxActive && "brightness-50"} flex flex-col bg-Pr min-h-screen h-full w-full  duration-200 relative `}
      >

        <div
          className='p-5'
        >
          <button
            onClick={() => setIsWarningBoxActive(true)}
            className='p-2 w-fit rounded-full bg-BG'
          >
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
              fill="currentColor" viewBox="0 0 24 24" >
              <path d="M11.79 6.29 6.09 12l5.7 5.71 1.42-1.42L9.91 13H18v-2H9.91l3.3-3.29z"></path>
            </svg>
          </button>
        </div>
        

        <div
          className='bg-BG p-7 rounded-tr-[2.5rem] flex flex-col gap-20 w-full min-h-[89.5vh] h-full pb-28 relative'
        >

          {/* project name and due date */}
          <div
            className='flex flex-col w-full gap-5'
          >
            <div
              className='w-full flex flex-col gap-1 pr-1'
            >
              <input 
                type="text" 
                placeholder='Project Name'
                className='border-none bg-transparent font-bold text-2xl outline-none w-full placeholder:text-DText'  
              />
              <span className='w-full h-0.5 bg-separator'></span>
            </div>

            <div
              className='w-full flex flex-col gap-1 pr-1'
            >
              <input 
                type="date" 
                className='text-CText border-none bg-transparent font-bold outline-none w-full'  
              />
              <span className='w-full h-0.5 bg-separator'></span>
            </div>
            
          </div>

          <div
            className='flex flex-col gap-3'
          >

            {/* separator */}
            <div
              className='flex flex-col gap-1'
            >
              <p
                className='font-semibold'
              >
                Tasks
              </p>
              <span className='w-full h-0.5 bg-separator'></span>
            </div>

            {/* current tasks for the project */}
            <div>
              {
                tasks.length > 0
                  ? <div>
                      <TaskCard/>
                    </div> 
                  : <p className={`font-semibold text-DText hidden ${isNewTaskActive ? "hidden" : "block"}`}>
                      No tasks have been created
                    </p>
              }
              <div
                className='flex flex-row items-start justify-start gap-2'
              >
                <span
                  className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'
                >
                  1
                </span>
                <ProjectTaskCard
                  id={0}
                  title={"Fix the Auth system"}
                  desc={"Fix the login function, the logout function, the Register function and the check-auth function."}
                  date={"2025-05-22"}
                />

              </div>
              
            
              <div
                className={`${isNewTaskActive ? "flex" : "hidden"} flex-row gap-2 justify-start items-start`}
              >
                <span
                  className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'
                >
                  {tasks.length + 1}
                </span>
                <NewTaskCard
                  setIsNewTaskActive={setIsNewTaskActive}
                  handleAddingTasks={handleAddingTasks}
                />
              </div>
              
            </div>

          </div>

          <div
            className='absolute bottom-0 p-5 left-0 flex flex-row items-center justify-end gap-2 w-full '
          >
            <button
              onClick={() => setIsNewTaskActive(true)}
              className='bg-Pr rounded-full p-2.5'
            >    
              <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
              </svg>
            </button>
            <button
              className='bg-Pr rounded-full p-2.5'
            >    
              <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Project