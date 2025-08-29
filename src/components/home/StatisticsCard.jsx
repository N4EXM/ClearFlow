import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { getTaskStatistics } from '../../database/tasksOperations'

const StatisticsCard = ({ title, icon, refreshTrigger}) => {
  const [data, setData] = useState({
    totalTasks: 0,
    completedTasks: 0,
    remainingTasks: 0,
    completionPercentage: 0,
    loading: true
  })
  
  const [error, setError] = useState(null)

  const handleGetData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true }))
      setError(null)
      const newData = await getTaskStatistics()
      setData({
        ...newData,
        loading: false
      })
    } catch (err) {
      setError(err.message)
      setData(prev => ({ ...prev, loading: false }))
    }
  }

  useEffect(() => {
    handleGetData()
  }, [refreshTrigger]) // Refresh when trigger changes

  // Calculate progress safely
  const progress = data.totalTasks > 0 
    ? (data.completedTasks / data.totalTasks) * 100 
    : 0

  if (error) {
    return (
      <div className='p-4 py-3 bg-BGS flex flex-col gap-7 rounded-md relative'>
        <div className='text-red-500'>Error: {error}</div>
        <button onClick={handleGetData}>Retry</button>
      </div>
    )
  }

  return (
    <div className='p-4 py-3 bg-BGS flex flex-col gap-7 rounded-md relative'>
      <div className='flex flex-col gap-3'>
        <h1 className='font-bold text-lg'>{title}</h1>
        <div className='flex flex-row gap-3'>
          <span className='bg-Pr p-3 rounded'>{icon}</span>
          <h1 className='pr-9 font-semibold'>
            {data.loading ? 'Loading...' : 
             data.totalTasks > 0 ? `${data.completedTasks}/${data.totalTasks} Tasks completed` : 
             "No current tasks"}
          </h1>
        </div>
      </div>
      
      <div className='flex flex-col gap-1'>
        <h6 className='text-xs text-DText font-medium'>
          {data.loading ? 'Calculating...' : 
           data.totalTasks > 0 ? `${Math.round(progress)}% completed` : 
           "No tasks"}
        </h6>
        <ProgressBar progress={data.loading ? 0 : Math.round(progress)} />
      </div>
      
      <button
        className='p-2 absolute top-2 right-2.5 active:bg-BG duration-200 rounded-full'
        onClick={handleGetData}
        disabled={data.loading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.07 4.93a9.9 9.9 0 0 0-3.18-2.14 10.12 10.12 0 0 0-7.79 0c-1.19.5-2.26 1.23-3.18 2.14S3.28 6.92 2.78 8.11A9.95 9.95 0 0 0 1.99 12h2c0-1.08.21-2.13.63-3.11.4-.95.98-1.81 1.72-2.54.73-.74 1.59-1.31 2.54-1.71 1.97-.83 4.26-.83 6.23 0 .95.4 1.81.98 2.54 1.72.17.17.33.34.48.52L16 9.01h6V3l-2.45 2.45c-.15-.18-.31-.36-.48-.52M19.37 15.11c-.4.95-.98 1.81-1.72 2.54-.73.74-1.59 1.31-2.54 1.71-1.97.83-4.26.83-6.23 0-.95-.4-1.81-.98-2.54-1.72-.17-.17-.33-.34-.48-.52l2.13-2.13H2v6l2.45-2.45c.15.18.31.36.48.52.92.92 1.99 1.64 3.18 2.14 1.23.52 2.54.79 3.89.79s2.66-.26 3.89-.79c1.19-.5 2.26-1.23 3.18-2.14s1.64-1.99 2.14-3.18c.52-1.23.79-2.54.79-3.89h-2c0 1.08-.21 2.13-.63 3.11Z"></path>
        </svg>
      </button>

      {data.loading && (
        <div className="absolute inset-0 bg-BGS bg-opacity-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-Pr"></div>
        </div>
      )}
    </div>
  )
}

export default StatisticsCard