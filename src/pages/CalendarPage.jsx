import React, { useEffect, useState, useRef } from 'react'
import { 
  getCurrentMonth, 
  getCurrentDate, 
  getCurrentDayInMonthIndex, 
  getCurrentYear, 
  getDaysInMonth, 
  getDateInDMY_Format, 
  getDateInYMD_Format 
} from '../utils/dateUtils'
import CalendarBtn from '../components/calendar/CalendarBtn'
import NewCalendarTaskCard from '../components/calendar/NewCalendarTaskCard'
import TaskCard from '../components/calendar/TaskCard'
import { mockTasks } from '../data'
import { addTask, deleteTask, updateTask } from '../database/tasksOperations'

const CalendarPage = ({ loading, currentProjects, currentTasks, setCurrentTasks, loadData }) => {
  const [errorMessage, setErrorMessage] = useState("")

  // State for managing UI toggles
  const [isNewTaskFormActive, setIsNewTaskFormActive] = useState(false)

  // Calendar state management
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]) // Tasks for the currently selected date
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(getCurrentMonth()) // 0-11 (Jan-Dec)
  const [selectedYear, setSelectedYear] = useState(getCurrentYear()) // e.g., 2025
  const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(getDaysInMonth(selectedYear, selectedMonthIndex))
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState(getCurrentDate())
  const [selectedDayIndex, setSelectedDayIndex] = useState(getCurrentDayInMonthIndex(selectedYear, selectedMonthIndex, selectedDayOfMonth))

  // Month and day name data
  const monthNames = [
    { fullName: "January", abrName: "Jan" },
    { fullName: "February", abrName: "Feb" },
    { fullName: "March", abrName: "Mar" },
    { fullName: "April", abrName: "Apr" },
    { fullName: "May", abrName: "May" },
    { fullName: "June", abrName: "Jun" },
    { fullName: "July", abrName: "Jul" },
    { fullName: "August", abrName: "Aug" },
    { fullName: "September", abrName: "Sep" },
    { fullName: "October", abrName: "Oct" },
    { fullName: "November", abrName: "Nov" },
    { fullName: "December", abrName: "Dec" },
  ]
  
  const dayNames = [
    { fullName: "Sunday", abrName: "Sun" },
    { fullName: "Monday", abrName: "Mon" },
    { fullName: "Tuesday", abrName: "Tue" },
    { fullName: "Wednesday", abrName: "Wed" },
    { fullName: "Thursday", abrName: "Thu" },
    { fullName: "Friday", abrName: "Fri" },
    { fullName: "Saturday", abrName: "Sat" },
  ]

  // Current date values for comparison
  const currentDayOfMonth = getCurrentDate()
  const currentMonthIndex = getCurrentMonth()
  const currentYear = getCurrentYear()

  // Refs for calendar navigation and scrolling
  const calendarScrollContainerRef = useRef(null);
  const dateButtonRefs = useRef([]);

  // Handler for when a calendar date button is clicked
  const handleDateSelection = (dayOfMonth) => {
    setSelectedDayOfMonth(dayOfMonth)
  }

  // Handler for changing months (next/previous)
  const handleMonthNavigation = (direction) => {
    if (direction === 'next') {
      setSelectedMonthIndex(prevMonthIndex => {
        const newMonthIndex = prevMonthIndex + 1
        // If moving past December, go to January of next year
        if (newMonthIndex > 11) {
          setSelectedYear(prevYear => prevYear + 1)
          return 0
        }
        return newMonthIndex
      })
    } else {
      setSelectedMonthIndex(prevMonthIndex => {
        const newMonthIndex = prevMonthIndex - 1
        // If moving before January, go to December of previous year
        if (newMonthIndex < 0) {
          setSelectedYear(prevYear => prevYear - 1)
          return 11
        }
        return newMonthIndex
      })
    }      
  }

  // Filters and loads tasks for the selected date
  const loadTasksForSelectedDate = (dateString) => {
    if (!currentTasks || !Array.isArray(currentTasks)) return;

    const filteredTasks = currentTasks.filter(task => {
      return task.formattedDate === dateString;
    });

    setTasksForSelectedDate(filteredTasks);
  }

  // Handler for adding a new task
  const handleTaskCreation = async (title, description) => {
    const newTask = {
      taskId: currentTasks.length === 1 ? 0 : currentTasks.length + 1,
      title: title,
      description: description,
      date: getDateInYMD_Format(selectedYear, selectedMonthIndex, selectedDayOfMonth),
      formattedDate: getDateInDMY_Format(selectedYear, selectedMonthIndex, selectedDayOfMonth),
      completed: false,
      projectId: null,
      projectName: null
    }

    await addTask(newTask)
    setCurrentTasks([...currentTasks, newTask])
    loadData()
  }

  // Handler for deleting a task
  const handleTaskDeletion = async (taskId) => {
    await deleteTask(taskId)
    setCurrentTasks(currentTasks.filter(task => taskId !== task.taskId))
  }

  // Handler for updating a task
  const handleTaskUpdate = async (taskId, title, description, date, formattedDate, completed, projectId, projectName) => {
    const updatedTask = {
      taskId: taskId,
      title: title,
      description: description,
      date: date,
      formattedDate: formattedDate,
      completed: completed,
      projectId: projectId,
      projectName: projectName
    }

    await updateTask(taskId, updatedTask)
    setCurrentTasks(prevTasks => prevTasks.map(task => task.taskId === updatedTask.taskId ? updatedTask : task))
    loadData()
  }

  // Effect to update days in month when month or year changes
  useEffect(() => {
    setDaysInSelectedMonth(getDaysInMonth(selectedYear, selectedMonthIndex))
    setSelectedDayIndex(getCurrentDayInMonthIndex(selectedYear, selectedMonthIndex, selectedDayOfMonth));
  }, [selectedDayOfMonth, selectedMonthIndex, selectedYear]);

  // Effect to scroll to selected date in calendar
  useEffect(() => {
    if (calendarScrollContainerRef.current && dateButtonRefs.current[selectedDayOfMonth - 1]) {
      const container = calendarScrollContainerRef.current;
      const button = dateButtonRefs.current[selectedDayOfMonth - 1];
    
      // Calculate scroll position to center the selected date
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
    
      container.scrollTo({
        left: buttonLeft - (containerWidth / 2) + ((buttonWidth + 140) / 2),
        behavior: 'smooth'
      });
    } else {
      const container = calendarScrollContainerRef.current;
      container.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [selectedMonthIndex, selectedDayOfMonth]);

  // Effect to reset to current date if viewing current month
  useEffect(() => {
    if (selectedMonthIndex === currentMonthIndex && selectedYear === currentYear) {
      setSelectedDayOfMonth(currentDayOfMonth)
    } else {
      setSelectedDayOfMonth(null)
    }
  }, [selectedMonthIndex])

  // Effect to load tasks when date changes
  useEffect(() => {
    if (selectedDayOfMonth) {
      const formattedDate = getDateInDMY_Format(selectedYear, selectedMonthIndex, selectedDayOfMonth);
      loadTasksForSelectedDate(formattedDate);
    }
  }, [selectedDayOfMonth, selectedMonthIndex, selectedYear, currentTasks]);

  // Effect to load initial data
  useEffect(() => {
    loadData()
    console.log(currentTasks)
  }, [])

  return (
    <div className='flex flex-col bg-Pr min-h-[80vh] h-fit w-full text-CText duration-200 relative font-poppins'>
      {/* Greeting section */}
      <p className={`text-lg font-semibold opacity-0 duration-200 ${loading && "opacity-100"} p-7`}>
        Hello Naeem
      </p>

      <div className='bg-BG p-7 rounded-tr-[2.5rem] flex flex-col gap-8 w-full min-h-[80vh] h-full pb-28'>
        {/* Month/Year display and navigation controls */}
        <div className='flex flex-row items-center justify-between w-full'>
          <p className='font-semibold text-lg'>
            {monthNames[selectedMonthIndex].fullName} {selectedYear}
          </p>
          <div className='flex flex-row items-center gap-3'>
            <button
              onClick={() => handleMonthNavigation('previous')}
              className='p-1 active:bg-Pr duration-500 rounded-full'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.29 6.29 8.59 12l5.7 5.71 1.42-1.42-4.3-4.29 4.3-4.29z"></path>
              </svg>
            </button>
            <button
              onClick={() => handleMonthNavigation('next')}
              className='p-1 active:bg-Pr duration-500 rounded-full'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Calendar date selection buttons */}
        <div ref={calendarScrollContainerRef} className='flex-row flex gap-3 overflow-x-scroll no-scrollbar'>
          {Array.from({ length: daysInSelectedMonth }, (_, index) => {
            const dayNumber = index + 1;
            const date = new Date(selectedYear, selectedMonthIndex, dayNumber);
            const dayOfWeekIndex = date.getDay(); // 0 (Sun) to 6 (Sat)

            return (
              <CalendarBtn
                key={dayNumber}
                ref={(el) => (dateButtonRefs.current[index] = el)}  
                day={dayNames[dayOfWeekIndex].abrName}
                selectedDate={selectedDayOfMonth}
                dateNumber={dayNumber}
                handleDateSelection={() => handleDateSelection(dayNumber)}
              />
            )
          })}
        </div>

        {/* Task section for selected date */}
        <div className='flex flex-col w-full h-fit gap-2'>
          {/* Selected date display and add task button */}
          <div className='flex flex-row justify-between pr-2'>
            <div className='flex flex-col'>
              <span className='text-xs font-medium text-DText'>
                {monthNames[selectedMonthIndex].abrName} {selectedDayOfMonth} {selectedYear}
              </span>
              <p className='font-medium'>
                {selectedDayOfMonth === currentDayOfMonth && 
                 selectedMonthIndex === currentMonthIndex && 
                 selectedYear === currentYear 
                  ? "Today"
                  : dayNames[selectedDayIndex].fullName
                }
              </p>
            </div>
            <button onClick={() => setIsNewTaskFormActive(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
              </svg>
            </button>
          </div>
          
          <span className='w-full bg-separator h-[0.75px]'></span>

          {/* Task list for selected date */}
          <div className='flex flex-col gap-3 w-full h-full pt-3'>
            {tasksForSelectedDate.length > 0 
              ? tasksForSelectedDate.map((task, index) => (
                  <div key={task.taskId} className='flex flex-row items-start justify-start gap-2'>
                    <span className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'>
                      {index + 1}
                    </span>
                    <TaskCard
                      id={task.taskId}
                      title={task.title}
                      description={task.description}
                      date={task.date}
                      formattedDate={task.formattedDate}
                      completed={task.completed}
                      projectId={task.projectId}
                      projectName={task.projectName}
                      updateFunction={handleTaskUpdate}
                      deleteFunction={() => handleTaskDeletion(task.taskId)}
                    /> 
                  </div> 
                ))
              : <div className={`w-full h-full ${isNewTaskFormActive && "hidden"}`}>
                  <p className='font-medium text-CText/70 text-sm'>
                    No Tasks due for today
                  </p>
                </div>
            }

            {/* New task form (conditionally rendered) */}
            <div className={`flex flex-row items-start justify-start gap-2 ${isNewTaskFormActive ? "flex" : "hidden"}`}>
              <span className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'>
                {tasksForSelectedDate.length + 1}
              </span>
              <NewCalendarTaskCard
                setIsNewTaskFormActive={setIsNewTaskFormActive}
                handleAddTask={handleTaskCreation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage