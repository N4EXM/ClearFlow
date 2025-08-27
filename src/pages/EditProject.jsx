import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import NewTaskCard from '../components/Project/NewTaskCard'
import ExistingProjectTaskCard from '../components/Project/ExistingProjectTaskCard'
import { updateProject, updateTask } from '../database/tasksOperations'

const EditProject = ({currentProjects, currentTasks, loadData}) => {

  // fake data
  const projectData = {
    projectId: 1,
    name: "Note App",
    date: "2025-09-10",
    percentage: 25,
    total: 4,
    remaining: 6
  }
  const taskData = [
    {
      "taskId": 1,
      "title": "Create the sidebar",
      "description": "create a sidebar that is functional and shows current notes",
      "date": "2025-08-27",
      "formattedDate": "27/08/2025",
      "completed": false,
      "projectId": 1,
      "projectName": "Note App"
    },
    {
      "taskId": 2,
      "title": "Create the Task Card",
      "description": "make a card that shows the title, description and date of the current note",
      "date": "2025-08-30",
      "formattedDate": "30/08/2025",
      "completed": false,
      "projectId": 1,
      "projectName": "Note App"
    },
    {
      "taskId": 3,
      "title": "Create a editor",
      "description": "make an editor that allows the user creates a note, and edit a task",
      "date": "2025-08-29",
      "formattedDate": "29/08/2025",
      "completed": false,
      "projectId": 1,
      "projectName": "Note App"
    }
  ]

  // navigation
  const navigate = useNavigate()

  // toggles
  const [isWarningBoxActive, setIsWarningBoxActive] = useState(false) // activates the warning dialogue box
  const [isNewTaskActive, setIsNewTaskActive] = useState(false) // activates the new task card for the project

  // errors
  const [projectNameError, setProjectNameError] = useState(false)
  const [projectDueDateError, setProjectDueDateError] = useState(false)
  const [taskListError, setTaskListError] = useState(false)
  const [noErrors, setNoErrors] = useState(false) 
  const [dateErrors, setDateErrors] = useState("")

  // project details
  const [projectTitle, setProjectTitle] = useState(projectData.name)
  const [projectDueDate, setProjectDueDate] = useState(projectData.date)
  
  // tasks details
  const [tasks, setTasks] = useState(taskData)
  const [taskLength, setTaskLength] = useState(tasks.length)

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

  const handleDeletingTask = (id) => {
    setTasks(tasks.filter(task => id !== task.taskId))
  }

  // used for setting the formatted date
  const handleFormatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`
  }

  // handles changing details of the tasks
  const handleEditingTasks = (id, title, desc, date, projectId) => {

    const editedTask = {
      taskId: id,
      title: title,
      description: desc,
      date: date,
      formattedDate: handleFormatDate(date),
      projectId: projectId,
      completed: false,
      projectName: null
    }

    setTasks(tasks.map(task =>
      task.taskId === id ? {...editedTask} : task
    ))

  }

  const checkTaskDates = () => {
    const projectDate = new Date(projectDueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    // Check if ANY task has an invalid date
    const hasInvalidDate = tasks.some(task => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0); // Reset time
    
      return taskDate > projectDate || taskDate < today;
    });

    setDateErrors(hasInvalidDate);
  };

  const handleCreatingProject = async () => {
  // Calculate validation errors based on current values
  const hasNameError = projectTitle.length === 0;
  const hasDateError = projectDueDate === "";
  const hasTaskError = tasks.length === 0;
  
  // Set error states
  setProjectNameError(hasNameError);
  setProjectDueDateError(hasDateError);
  setTaskListError(hasTaskError);
  
  // Check if any errors exist
  if (hasNameError || hasDateError || hasTaskError) {
    return; // Stop execution if any errors
  }

  try {
    // Your project creation logic here...
    const newProject = {
      projectId: currentProjects.length === 1 ? 0 : currentProjects.length + 1,
      name: projectTitle,
      date: projectDueDate,
      percentage: 0,
      total: tasks.length,
      remaining: tasks.length
    };
    
    await addProject(newProject);
    await addMultipleTasks(tasks.map(task => ({
      ...task,
      projectName: projectTitle,
      projectId: newProject.projectId
    })));
    
    loadData();

    navigate("/")
    
  } 
  catch (error) {
    console.error('Creation failed:', error);
  }
}; 

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
    console.log(tasks)
    console.log("tasks length:", taskLength)
    checkTaskDates()
  }, [projectDueDate, tasks])


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

      {/* main container */}
      <div
        className={`${isWarningBoxActive && "brightness-50"} flex flex-col bg-Pr min-h-screen h-full w-full  duration-200 relative `}
      >

        {/* exit button */}
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

        {/* project inputs */}
        <div
          className='bg-BG p-7 rounded-tr-[2.5rem] flex flex-col gap-20 w-full min-h-[89.5vh] h-full pb-28 relative'
        >

          {/* project name and date */}
          <div
            className='flex flex-col w-full gap-5'
          >

            {/* name */}
            <div
              className='w-full flex flex-col gap-1 pr-1 relative'
            >
              <input 
                type="text" 
                placeholder='Project Name...'
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)} 
                className='border-none bg-transparent font-bold text-2xl outline-none w-full placeholder:text-DText first-letter:uppercase'
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
            </div>

            {/* date */}
            <input 
              type="date" 
              value={projectDueDate}
              onChange={(e) => { setProjectDueDate(e.target.value)}}
              className={`text-CText border-none bg-transparent font-semibold outline-none w-full`} 
              min={new Date().toISOString().split('T')[0]}
            />

          </div>

          {/* current tasks for the project */}
        <div
          className='flex flex-col gap-5'      
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
                      <ExistingProjectTaskCard
                        id={task.taskId}
                        title={task.title}
                        description={task.description}
                        date={task.date}
                        formattedDate={task.formattedDate}
                        completed={task.completed}
                        projectId={task.projectId}
                        maxDate={projectDueDate}
                        updateFunction={handleEditingTasks}
                        deleteFunction={() => handleDeletingTask(task.taskId)}
                      />
                    </div>
                  ))
                    
                : 
                  <div
                    className='flex flex-row items-center justify-between w-full'
                  >
                    <p className={`font-semibold text-DText ${isNewTaskActive ? "hidden" : "block"}`}>
                      No tasks have been created
                    </p>
                      
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
        {/*  */}

        {/* add new task button and create project */}
        <div
          className='absolute bottom-0 p-5 left-0 flex flex-row items-center justify-end gap-2 w-full '
        >
          <button
            onClick={() => handleNewTaskToggle()}
            className={`bg-Pr rounded-full p-2.5 ${projectTitle !== "" && projectDueDate !== "" ? "block" : "hidden"}`}
          >    
            <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28"  
              fill="currentColor" viewBox="0 0 24 24" >
              <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
            </svg>
          </button>
          <button
            onClick={() => handleCreatingProject()}
            className={`bg-Pr rounded-full p-2.5  ${projectTitle !== "" && projectDueDate !== "" && tasks.length > 0 && !dateErrors ? "block" : "hidden"}`}
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

export default EditProject

