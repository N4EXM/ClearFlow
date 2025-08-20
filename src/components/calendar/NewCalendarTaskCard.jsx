import React, { useState } from 'react'

const NewCalendarTaskCard = ({setIsNewTaskFormActive, handleAddTask}) => {

    // task details
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // task functions

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 28) {
            setTitle(value);
        }
        // If length exceeds maxLength, don't update the state
    }

    const closeTaskCard = () => {
        setTitle("")
        setDescription("")

        setIsNewTaskFormActive(false)
    }

    const handleAddingTask = () => {
        handleAddTask(title, description)
        closeTaskCard()
    } 

  return (
    <div
        className='w-full min-h-24 h-full bg-BGS rounded-md px-4 py-4 pt-3 flex flex-col justify-between'
    >
        
        <div
            className='w-fit h-full flex flex-col gap-1'
        >
            <input 
                value={title}
                onChange={(e) => handleTitleChange(e)}
                type="text" 
                placeholder='Task title...'
                className='w-56 outline-none text-sm font-medium placeholder:text-DText'
            />
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder='Task description...'
                className='w-56 min-h-12 h-full resize-none no-scrollbar outline-none text-xs font-medium placeholder:text-DText'
                maxLength={100}
            ></textarea>
        </div>

        <div
            className='flex item-end justify-end w-full h-full pt-2'
        >
            <div
                className='flex flex-row items-center justify-end gap-1'
            >
                
                <button
                    onClick={() => closeTaskCard()}
                    className='p-1.5 rounded bg-rose-500'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                    </svg>
                </button>
                <button
                    onClick={() => handleAddingTask()}
                    className='p-1.5 rounded bg-Pr'
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                    </svg>
                </button>
            </div>
        </div>
        

    </div>
  )
}

export default NewCalendarTaskCard