import React, { useEffect, useState } from 'react'
// import { useCurrentDateInfo } from '../hooks/useCurrentDateInfo'
import { getCurrentMonth, getCurrentDate, getCurrentDayInMonthIndex, getCurrentYear, getDaysInMonth } from '../utils/dateUtils'
import CalendarBtn from '../components/CalendarBtn'
import NewTaskCard from '../components/NewTaskCard'
import TaskCard from '../components/TaskCard'

const CalendarPage = ({loading}) => {

    const [error, setError] = useState("")
    // const dateInfo = useCurrentDateInfo()

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
        abrName: "Sept"
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

    const [currentMonth, setCurrentMonth] = useState(getCurrentMonth()) // 0 - 12 months
    const [currentYear, setCurrentYear] = useState(getCurrentYear()) // e.g current year: 2025
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(currentYear, currentMonth))
    const [currentDate, setCurrentDate] = useState(getCurrentDate())
    const [currentDayIndex, setCurrentDayIndex] = useState(getCurrentDayInMonthIndex(currentYear, currentMonth , currentDate))

    // useEffect(() => {
    //   console.log("current month: ",currentMonth)
    //   console.log("current year: ",currentYear)
    //   console.log("current days: ", daysInMonth)
    //   console.log("current day selected: ", getCurrentDayInMonthIndex(currentYear, currentMonth, 28))
    //   console.log("current date: ", getCurrentDate())
    // },[])

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
        className='bg-BG p-7 rounded-tr-[2.5rem] flex flex-col gap-8 w-full min-h-[80vh] h-full'
      >
        
        <div
          className='flex flex-row items-center justify-between w-full'
        >
          <p
            className='font-semibold text-lg'
          >
            {months[currentMonth].fullName} {currentYear}
          </p>
          <div
            className='flex flex-row items-center gap-3'
          >
            <button>
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M14.29 6.29 8.59 12l5.7 5.71 1.42-1.42-4.3-4.29 4.3-4.29z"></path>
              </svg>
            </button>
            <button>
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="m9.71 17.71 5.7-5.71-5.7-5.71-1.42 1.42 4.3 4.29-4.3 4.29z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* calendar buttons */}
        <div
          className='flex-row flex gap-3 overflow-x-scroll no-scrollbar'
        >
          {
            Array.from({ length: daysInMonth }, (_, index) => {
              
              const date = new Date(currentYear, currentMonth, index + 1);
              const dayNameIndex = date.getDay(); // 0 (Sun) to 6 (Sat)

              return (
              <CalendarBtn
                key={index + 1}
                day={days[dayNameIndex].abrName}
                num={index + 1}
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
                {months[currentMonth].abrName} {currentDate} {currentYear}
              </span>
              <p
                className='font-medium'
              >
                {days[currentDayIndex].fullName}
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

            <div
              className='flex flex-row items-start justify-start gap-2'
            >
              <span
                className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'
              >
                1
              </span>
              <TaskCard
                title={"Fix the Auth system"}
                description={"Fix the login function, the logout function, the Register function and the check-auth function."}
              /> 
            </div>

            <div
              className='flex flex-row items-start justify-start gap-2'
            >
              <span
              className='p-1 rounded-full border border-Pr min-w-6 text-[0.6rem] h-fit flex items-center bg-BGS font-medium justify-center mt-2'
            >
                2
              </span>
              <NewTaskCard/>
            
            </div>

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