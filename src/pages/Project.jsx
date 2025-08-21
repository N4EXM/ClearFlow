import React, { useRef } from 'react'
import { data, useNavigate } from 'react-router-dom'
import NewTaskCard from '../components/Project/NewTaskCard'
import ProjectTaskCard from '../components/Project/ProjectTaskCard'
import { useEffect, useState} from 'react'

const Project = ({loading, currentTasks, currentProjects, loadData}) => {

  // navigation
  const navigate = useNavigate()

  // toggles
  const [isWarningBoxActive, setIsWarningBoxActive] = useState(false) // activates the warning dialogue box
  const [isNewTaskActive, setIsNewTaskActive] = useState(false) // activates the new task card for the project

  // errors
  const [projectNameError, setProjectNameError] = useState(false)
  const [projectDueDateError, setProjectDueDateError] = useState(false)
  const [taskListError, setTaskListError] = useState(false) 

  // project details
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDueDate, setProjectDueDate] = useState("")
  
  // tasks details
  const [tasks, setTasks] = useState([])
  const [taskLength, setTaskLength] = useState(currentTasks.length)

  // function to add tasks
  const handleAddingTasks = (title, desc, date) => {

    const newTask = {
      taskId: taskLength + 1,
      title: title, 
      description: desc,
      date: date,
      formattedDate: handleFormatDate(date),
      completed: false,
      projectId: currentProjects.length === 1 ? 0 : currentProjects.length + 1,
      projectName: null
    }
    setTaskLength(taskLength + 1)
    setTasks([...tasks, newTask])
    setIsNewTaskActive(false)
  }

  // used for setting the formatted date
  const handleFormatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`
  }

  // handles changing details of the tasks
  const handleEditingTasks = (id, title, desc, date, projectId,) => {

    const editedTask = {
      taskId: id,
      title: title,
      description: desc,
      date: date,
      formattedDate: handleFormatDate(date),
      projectId: projectId,
      completed: false
    }

    setTasks(tasks.map(task =>
      task.taskId === id ? {...editedTask} : task
    ))

  }

  // finishes the project creation
  const handleCreatingProject = () => {

    if (projectTitle.length === 0 ) {
      setProjectNameError(true)
    } 
    if (projectDueDate === "") {
      setProjectDueDateError(true)
    }
    if (tasks.length === 0) {
      setTaskListError(true)
    }
    if (projectNameError === false && projectDueDateError === false && tasks.length > 0) {
      console.log(true)
    }
  }

  const handleNewTaskToggle = () => {

    if (projectTitle.length === 0 ) {
      setProjectNameError(true)
    } 
    if (projectDueDate === "") {
      setProjectDueDateError(true)
    }
    if (projectNameError === false && projectDueDateError === false) {
      setTaskListError(false)
      loadData()
      setIsNewTaskActive(true)
    }

  }

  useEffect(() => {
    loadData()
    console.log(tasks)
    console.log(taskLength)
  }, [tasks])

  return (
    <div
      className={`relative font-poppins text-CText`}
    >

      {/* alert box */}
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
              className='w-full flex flex-col gap-1 pr-1 relative'
            >
              <input 
                type="text" 
                placeholder='Project Name...'
                value={projectTitle}
                onClick={() => setProjectNameError(false)}
                onChange={(e) => setProjectTitle(e.target.value)}
                className={`border-none bg-transparent font-bold text-2xl outline-none w-full placeholder:text-DText first-letter:uppercase ${projectNameError && "placeholder:text-rose-500/70"}`}
              />
              {/* <span className='w-full h-0.5 bg-separator rounded-full'></span> */}
              <button
                onClick={() => setProjectTitle("")}
                className={`w-fit h-fit p-2 absolute right-0 top-0.5 text-rose-400 ${projectTitle.length > 0 ? "block" : "hidden"}`}
              >
                <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                  fill="currentColor" viewBox="0 0 24 24" >
                  <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                </svg>
              </button>
              <i
                className={`${projectNameError ? "block" : "hidden"} absolute top-1.5 text-rose-500 right-2`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m13.299 3.148l8.634 14.954a1.5 1.5 0 0 1-1.299 2.25H3.366a1.5 1.5 0 0 1-1.299-2.25l8.634-14.954c.577-1 2.02-1 2.598 0M12 4.898L4.232 18.352h15.536zM12 15a1 1 0 1 1 0 2a1 1 0 0 1 0-2m0-7a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/></g></svg>
              </i>
            </div>

            <div
              className='w-full flex flex-col gap-1 pr-1 relative'
            >
              <input 
                type="date" 
                value={projectDueDate}
                onChange={(e) => { setProjectDueDate(e.target.value), setProjectDueDateError(false)}}
                className={`text-CText border-none bg-transparent font-semibold outline-none w-full ${projectDueDateError && "text-rose-500/70"}`} 
                onClick={() => setProjectDueDateError(false)}
                min={new Date().toISOString().split('T')[0]}
              />
              {/* <span className='w-full h-0.5 bg-separator rounded-full'></span> */}
              <i  
                className={`${projectDueDateError ? "block" : "hidden"} absolute -top-1.5 text-rose-500 -right-0 p-2 bg-BG`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m13.299 3.148l8.634 14.954a1.5 1.5 0 0 1-1.299 2.25H3.366a1.5 1.5 0 0 1-1.299-2.25l8.634-14.954c.577-1 2.02-1 2.598 0M12 4.898L4.232 18.352h15.536zM12 15a1 1 0 1 1 0 2a1 1 0 0 1 0-2m0-7a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/></g></svg>
              </i>
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
              <span className='w-full h-0.5 bg-separator rounded-full'></span>
            </div>

            {/* current tasks for the project */}
            <div
              className='flex flex-col gap-3'
            >
              {
                tasks.length > 0
                  ? tasks.map((task, index) => (
                      <div
                        key={task.taskId}
                        className='flex flex-row items-start justify-start gap-2'
                      >
                        <span
                          className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'
                        >
                          {index + 1}
                        </span>
                        <ProjectTaskCard
                          id={task.taskId}
                          title={task.title}
                          description={task.description}
                          date={task.date}
                          handleEditingTasks={handleEditingTasks}
                          minDate={new Date().toISOString().split('T')[0]}
                          maxDate={projectDueDate}
                        />
                      </div>
                    ))
                      
                  : 
                    <div
                      className='flex flex-row items-center justify-between w-full'
                    >
                      <p className={`font-semibold text-DText ${isNewTaskActive ? "hidden" : "block"} ${taskListError && "text-rose-500/70"}`}>
                        No tasks have been created
                      </p>
                      
                      {
                        taskListError 
                        && <svg className='text-rose-500/70' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m13.299 3.148l8.634 14.954a1.5 1.5 0 0 1-1.299 2.25H3.366a1.5 1.5 0 0 1-1.299-2.25l8.634-14.954c.577-1 2.02-1 2.598 0M12 4.898L4.232 18.352h15.536zM12 15a1 1 0 1 1 0 2a1 1 0 0 1 0-2m0-7a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/></g></svg>
                      }
                    </div>
                  
              }
              
            
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
                  minDate={new Date().toISOString().split('T')[0]}
                  maxDate={projectDueDate}
                />
              </div>
              
            </div>

          </div>

          {/* add new task button and create project */}
          <div
            className='absolute bottom-0 p-5 left-0 flex flex-row items-center justify-end gap-2 w-full '
          >
            <button
              onClick={() => handleNewTaskToggle()}
              className='bg-Pr rounded-full p-2.5'
            >    
              <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
              </svg>
            </button>
            <button
              onClick={() => handleCreatingProject()}
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