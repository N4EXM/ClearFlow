import React from 'react'

const CalendarBtn = React.forwardRef(({ day, selectedDate, num }, ref) => {  
    
    return (
    <button
        ref={ref}
        className={`${selectedDate === num ? "bg-Pr" : "bg-BGS"}  min-w-14 flex flex-col p-3.5 py-3 gap-2 rounded-md items-center justify-center border border-Pr`}
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
    </button>
  )
})

export default CalendarBtn