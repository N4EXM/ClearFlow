import React, { useState } from 'react'
import CalendarBtn from '../components/CalendarBtn'
import NewTaskCard from '../components/NewTaskCard'
import TaskCard from '../components/TaskCard'

const CalendarPage = ({loading}) => {

    const [error, setError] = useState("")

  return (
    <div
      className='flex flex-col bg-Pr min-h-screen h-full w-full text-CText duration-200 relative font-poppins'
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
            August 2025
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
        

        <div
          className='flex-row flex gap-3 overflow-x-scroll no-scrollbar'
        >
          <CalendarBtn
            day={"Mon"}
            num={1}
          />
          <CalendarBtn
            day={"Tue"}
            num={2}
          />
          <CalendarBtn
            day={"Wed"}
            num={3}
          />
          <CalendarBtn
            day={"Thu"}
            num={4}
          />
          <CalendarBtn
            day={"Fri"}
            num={5}
          />
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
                Aug 2 2025
              </span>
              <p
                className='font-medium'
              >
                Monday
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


      </div>

    </div>
  )
}

export default CalendarPage