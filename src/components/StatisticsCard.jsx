import React from 'react'
import ProgressBar from './ProgressBar'

const StatisticsCard = ({title, icon, completed, max}) => {

    const progress = (completed / max) * 100

  return (
    <div
        className='p-4 py-3 bg-BGS flex flex-col gap-7 rounded-md'
    >
        <div
            className='flex flex-col gap-3'
        >
            <h1
                className='font-bold text-lg'
            >
                {title}
            </h1>
            <div
                className='flex flex-row gap-3'
            >
                <span
                    className='bg-Pr p-3 rounded'
                >
                    {icon}
                </span>
                <h1
                    className='pr-5 font-semibold'
                >
                    {completed}/{max} Tasks completed
                </h1>
            </div>
        </div>
        <div
            className='flex flex-col gap-1'
        >
            <h6
                className='text-xs text-DText font-medium'
            >
                {progress}% remaining tasks
            </h6>
            <ProgressBar
                progress={progress}
            />
        </div>
        
    </div>
  )
}

export default StatisticsCard