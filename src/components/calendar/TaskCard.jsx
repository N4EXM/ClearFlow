import React from 'react'

const TaskCard = ({title, description, projectName}) => {
  return (
    <div
        className='w-full min-h-32 h-full bg-BGS rounded-md px-4 py-4 pt-3 flex flex-col justify-between'
    >
        
        <div
            className='w-fit h-full flex flex-col gap-1'
        >
            <input 
                readOnly
                value={title}
                type="text" 
                placeholder='Task title...'
                className='w-40 outline-none text-sm font-medium placeholder:text-DText'
            />
            <textarea 
                readOnly
                value={description}
                type="text"
                placeholder='Task description...'
                className='w-56 h-full min-h-12 resize-none no-scrollbar outline-none text-xs font-medium placeholder:text-DText text-CText/70'
                maxLength={130}
            ></textarea>
        </div>

        <div
            className='flex item-end justify-end w-full h-full'
        >
            <div
                className='flex flex-row items-center justify-between gap-1 w-full'
            >                
                <p
                    className='text-xs font-medium text-DText'
                >
                    {projectName}
                </p>
                <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M6 13h6v4l6-5-6-5v4H6z"></path>
                </svg>
            </div>
        </div>
        

    </div>
  )
}

export default TaskCard