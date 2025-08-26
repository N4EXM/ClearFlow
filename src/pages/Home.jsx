import React, { useEffect } from 'react'
import ProjectCard from '../components/home/ProjectCard'
import UpcomingTask from '../components/home/UpcomingTask'
import StatisticsCard from '../components/home/StatisticsCard'
import { getTasksByProjectId } from '../database/tasksOperations'

const Home = ({loading, projects, tasks}) => {
  
  return (
    <div
      className='flex flex-col gap-5 bg-BG min-h-screen h-full w-full text-CText duration-200 p-7 relative font-poppins pb-32'
    >
      <p
        className={`text-lg font-semibold opacity-0 duration-200 ${loading && "opacity-100"}`}
      >
        Hello Naeem
      </p>

      {/* current projects */}
      <div
        className={`flex flex-col gap-3 bg-BGS p-3 rounded-md min-h-40 h-full opacity-0 duration-1000 ${loading && "opacity-100"}`}
      >
        <p
          className='text-sm font-semibold pl-1'
        >
          Current Projects
        </p>

        {
          projects.length > 0
          ? projects.map((project, _) => (
              <ProjectCard
                key={project.projectId}
                id={project.projectId}
                name={project.name}
                date={project.date}
                percentage={project.percentage}
                total={project.total}
                remaining={project.remaining}
              />              
            ))
          : <div
              className='flex items-center justify-center w-full min-h-20'
            >
              <p
                className='w-full h-full flex items-center justify-center text-sm font-medium text-DText'
              >
                No projects
              </p>
            </div>
        }

      </div>

      {/* current tasks */}
      <div
        className={`flex flex-col gap-3 bg-BGS p-3 rounded-md min-h-40 h-full opacity-0 duration-200 delay-1000 ${loading && "opacity-100"}`}
      >

        <p
          className='text-sm font-semibold pl-1'        
        >
          Current Tasks
        </p>

        {
          tasks.length > 0
          ? tasks.map((task, _) => (
              <UpcomingTask
                key={task.taskId}
                id={task.taskId}
                title={task.title}
                description={task.description}
                date={task.date}
              />              
            ))
          : <div
              className='flex items-center justify-center w-full min-h-20'
            >
              <p
                className='w-full h-full flex items-center justify-center text-sm font-medium text-DText'
              >
                No Tasks
              </p>
            </div>
        }
        

      </div>
      <StatisticsCard
        title={"Remaining tasks"}
        icon={
              <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M19 3h-2c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 17H5V5h2v2h10V5h2z"></path><path d="M11 14.09 8.71 11.8 7.3 13.21l3 3c.2.2.45.29.71.29s.51-.1.71-.29l5-5-1.41-1.41-4.29 4.29Z"></path>
              </svg>
        }
        completed={20}
        max={40}
      />

    </div>
  )
}

export default Home