import React, { useEffect, useState, useRef } from 'react'
import { getCurrentMonth, getCurrentDate, getCurrentDayInMonthIndex, getCurrentYear, getDaysInMonth, getDateInDMY_Format } from '../utils/dateUtils'
import CalendarBtn from '../components/CalendarBtn'
import NewTaskCard from '../components/NewTaskCard'
import TaskCard from '../components/TaskCard'

const CalendarPage = ({loading, mockTasks, mockProjects}) => {

    const [error, setError] = useState("")
    const [tasks, setTasks] = useState(mockTasks)
    const [projects, setProjects] = useState(mockProjects)
    // const dateInfo = useCurrentDateInfo()

    const [loadedTasks, setLoadedTasks] = useState([]) // contains the tasks of the current date
    const months = [
      {
        fullName: "January",
        abrName: "Jan"
      },
      {
        fullName: "February",
        abrName: "Feb"
      },
      {
        fullName: "March",
        abrName: "Mar"
      },
            {
        fullName: "April",
        abrName: "Apr"
      },
      {
        fullName: "May",
        abrName: "May"
      },
      {
        fullName: "June",
        abrName: "Jun"
      },
            {
        fullName: "July",
        abrName: "Jul"
      },
      {
        fullName: "August",
        abrName: "Aug"
      },
      {
        fullName: "September",
        abrName: "Sep"
      },
      {
        fullName: "October",
        abrName: "Oct"
      },
      {
        fullName: "November",
        abrName: "Nov"
      },
      {
        fullName: "December",
        abrName: "Dec"
      },
    ]
    const days = [
      {
        fullName: "Sunday",
        abrName: "Sun"
      },
      {
        fullName: "Monday",
        abrName: "Mon"
      },
      {
        fullName: "Tuesday",
        abrName: "Tue"
      },
      {
        fullName: "Wednesday",
        abrName: "Wed"
      },
      {
        fullName: "Thursday",
        abrName: "Thu"
      },
      {
        fullName: "Friday",
        abrName: "Fri"
      },
      {
        fullName: "Saturday",
        abrName: "Sat"
      },
    ]
    const today = getCurrentDate()
    const month =  getCurrentMonth()
    const year = getCurrentYear()

    const [selectedMonth, setSelectedMonth] = useState(month) // 0 - 12 months
    const [selectedYear, setSelectedYear] = useState(year) // e.g current year: 2025
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedYear, selectedMonth))
    const [selectedDate, setSelectedDate] = useState(today)
    const [selectedDayIndex, setSelectedDayIndex] = useState(getCurrentDayInMonthIndex(selectedYear, selectedMonth , selectedDate))

    const scrollContainerRef = useRef(null);
    const dateButtonRefs = useRef([]);

    const handleCalendarBtnChange = (index) => {
      setSelectedDate(index)
    }

    // adds or subtracts one from the current month index and changes years
    const handleMonthChange = (operation) => {
      if (operation === 1) {
        setSelectedMonth(selectedMonth + 1)
        if (selectedMonth > 10) {
          setSelectedMonth(0)
          setSelectedYear(selectedYear + 1)
        }
      }
      else {
        setSelectedMonth(selectedMonth - 1)
        if (selectedMonth < 1) {
          setSelectedYear(selectedYear - 1)
          setSelectedMonth(11)
        }
      }      
    }

    // loads the tasks associated with the selected date
    const handleTasksDateChange = (date) => {

      if (!tasks || !Array.isArray(tasks)) return;
  
      const filteredTasks = tasks.filter(task => {
        // Assuming each task has a date property in the same format as getDateInDMY_Format returns
        return task.date === date;
      });
  
      setLoadedTasks(filteredTasks);

    }

    // changes the days to the current month
    useEffect(() => {
      setDaysInMonth(getDaysInMonth(selectedYear, selectedMonth))
      setSelectedDayIndex(getCurrentDayInMonthIndex(selectedYear, selectedMonth, selectedDate));
      
    }, [selectedDate, selectedMonth, selectedYear]);

    // slides automatically to the selected calendarBtn
    useEffect(() => {
        // Scroll to current date when month changes or component mounts
      if (scrollContainerRef.current && dateButtonRefs.current[selectedDate - 1]) {
        const container = scrollContainerRef.current;
        const button = dateButtonRefs.current[selectedDate - 1];
      
        // Calculate scroll position
        const containerWidth = container.offsetWidth;
        const buttonLeft = button.offsetLeft;
        const buttonWidth = button.offsetWidth;
      
        // Scroll to center the button
        container.scrollTo({
          left: buttonLeft - (containerWidth / 2) + ((buttonWidth + 140) / 2),
          behavior: 'smooth'
        });
      }
      else {
        const container = scrollContainerRef.current;
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      }
    }, [selectedMonth, selectedDate]);

    // checks if the date is from current month and year
    useEffect(() => {
      if (selectedMonth === month && selectedYear === year) {
        setSelectedDate(today)
      }
      else {
        setSelectedDate(null)
      }
    }, [selectedMonth])

    useEffect(() => {
      if (selectedDate) {
        const formattedDate = getDateInDMY_Format(selectedYear, selectedMonth, selectedDate);
        handleTasksDateChange(formattedDate);
      }
    }, [selectedDate, selectedMonth, selectedYear, tasks]);

  return (
    <div
      className='flex flex-col bg-Pr min-h-[80vh] h-fit w-full text-CText duration-200 relative font-poppins'
    >
      
      <p
        className={`text-lg font-semibold opacity-0 duration-200 ${loading && "opacity-100"} p-7`}
      >
        Hello Naeem
      </p>

      <div
        className='bg-BG p-7 rounded-tr-[2.5rem] flex flex-col gap-8 w-full min-h-[80vh] h-full pb-28'
      >
        
        <div
          className='flex flex-row items-center justify-between w-full'
        >
          <p
            className='font-semibold text-lg'
          >
            {months[selectedMonth].fullName} {selectedYear}
          </p>
          <div
            className='flex flex-row items-center gap-3'
          >
            <button
              onClick={() => handleMonthChange(2)}
              className='p-1 active:bg-Pr duration-500 rounded-full'
            >
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M14.29 6.29 8.59 12l5.7 5.71 1.42-1.42-4.3-4.29 4.3-4.29z"></path>
              </svg>
            </button>
            <button
              onClick={() => handleMonthChange(1)}
              className='p-1 active:bg-Pr duration-500 rounded-full'
            >
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* calendar buttons */}
        <div
          ref={scrollContainerRef}
          className='flex-row flex gap-3 overflow-x-scroll no-scrollbar'
        >
          {
            Array.from({ length: daysInMonth }, (_, index) => {
              
              const date = new Date(selectedYear, selectedMonth, index + 1);
              const dayNameIndex = date.getDay(); // 0 (Sun) to 6 (Sat)

              return (
                <CalendarBtn
                  key={index + 1}
                  ref={(el) => (dateButtonRefs.current[index] = el)}  
                  day={days[dayNameIndex].abrName}
                  selectedDate={selectedDate}
                  num={index + 1}
                  handleCalendarBtnChange={() => handleCalendarBtnChange(index + 1)}

                />
              )
            })}
        </div>

        <div
          className='flex flex-col w-full h-fit gap-2'
        >

          {/* selected date and add new task btn */}
          <div
            className='flex flex-row justify-between pr-2'
          >

            <div
              className='flex flex-col'
            >
              <span
                className='text-xs font-medium text-DText'
              >
                {months[selectedMonth].abrName} {selectedDate} {selectedYear}
              </span>
              <p
                className='font-medium'
              >
                {selectedDate === today && selectedMonth === month && selectedYear === year 
                  ? "Today"
                  : days[selectedDayIndex].fullName
                }
              </p>
            </div>
            <button>
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
              </svg>
            </button>

          </div>
          <span className='w-full bg-separator h-[0.75px]'></span>

          {/* current tasks */}
          <div
            className='flex flex-col gap-3 w-full h-full pt-3'
          >

            {loadedTasks.length > 0 
              ? loadedTasks.map((task, index) => (
                  <div
                    className='flex flex-row items-start justify-start gap-2'
                  >
                    <span
                      className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'
                    >
                      {index + 1}
                    </span>
                      <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        projectName={task.projectName}
                      /> 
                  </div> 
                ))
              : <div
                  className='w-full h-full'
                >
                  <p
                    className='font-medium text-CText/70 text-sm '
                  >
                    No Tasks due for today
                  </p>
                </div>
              
            }

            {/* <div
              className='flex flex-row items-start justify-start gap-2'
            >
              <span
                className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'
              >
                2
              </span>
              <NewTaskCard/>
            </div> */}

          </div>

        </div>

        {/* {dateInfo !== null &&
          <div
            className='flex flex-col gap-5'
          >
          <h2>Current Date Information</h2>
          <p>Full date: {dateInfo.date.toString()} {dateInfo.day.other}</p>
          <p>Day: {dateInfo.day.long} ({dateInfo.day.short})</p>
          <p>last day: {dateInfo.day.daysInMonth}</p>
          <p>Month: {dateInfo.month.long} ({dateInfo.month.short})</p>
          <p>Year: {dateInfo.year}</p>
          <p>Day of month: {dateInfo.dayOfMonth}</p>
          <p>Time: {dateInfo.time.hours}:{dateInfo.time.minutes}:{dateInfo.time.seconds}</p>
        </div>
        } */}
        

      </div>

    </div>
  )
}

export default CalendarPage