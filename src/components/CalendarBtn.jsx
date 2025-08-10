import React from 'react'

const CalendarBtn = ({day, num}) => {
  return (
    <div
        className='min-w-14 flex flex-col p-3.5 py-3 gap-2 rounded-md items-center justify-center bg-BGS border border-Pr'
    >
        <p
            className='font-medium text-sm'
        >
            {day}
        </p>
        <p
            className='font-medium'
        >
            {num}
        </p>
    </div>
  )
}

export default CalendarBtn