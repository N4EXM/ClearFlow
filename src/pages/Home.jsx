import React from 'react'
import ProjectCard from '../components/ProjectCard'

const Home = ({loading}) => {
  return (
    <div
      className='flex flex-col gap-5 bg-BG min-h-screen h-full w-full text-CText duration-200 p-7 relative font-poppins'
    >
      <p
        className={`text-lg font-semibold opacity-0 duration-200 ${loading && "opacity-100"}`}
      >
        Hello Naeem
      </p>

      <div
        className='flex flex-col gap-3 bg-BGS p-3 rounded-md min-h-40 h-full'
      >
        <p
          className='text-sm font-semibold'
        >
          Current Tasks
        </p>

        <ProjectCard></ProjectCard>

      </div>

    </div>
  )
}

export default Home