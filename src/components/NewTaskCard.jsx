import React from 'react'

const NewTaskCard = () => {
  return (
    <div
        className='w-full min-h-36 bg-BGS rounded-md px-3 py-3 pt-2 flex flex-col justify-between'
    >
        
        <div
            className='w-fit h-full flex flex-col gap-1'
        >
            <input 
                type="text" 
                placeholder='Task title...'
                className='w-40 outline-none text-sm font-medium placeholder:text-DText'
            />
            <textarea 
                type="text"
                placeholder='Task description...'
                className='w-56 h-16 resize-none no-scrollbar outline-none text-xs font-medium placeholder:text-DText'
                maxLength={130}
            ></textarea>
        </div>
        

    </div>
  )
}

export default NewTaskCard