import React, { useEffect, useState } from 'react'

const NewTaskCard = ({setIsNewTaskActive, handleAddingTasks, minDate, maxDate}) => {

    // toggles
    const [isError, setIsError] = useState(false)

    // task details
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [currentProjectDate, setCurrentProjectDate] = useState(maxDate || "")

    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 28) {
            setTitle(value);
        }
        // If length exceeds maxLength, don't update the state
    }

    const handleNewTaskClose = () => {
        setIsNewTaskActive(false)
        setTitle("")
        setDesc("")
        setDate("")
        setIsError(false)
    }

    const addingTask = () => {

        if (title === "" || desc === "" || date == "" || (date > maxDate || date < minDate)) {
            setIsError(true)
            console.log("ran")
        }
        else {
            setIsError(false)
            handleAddingTasks(title, desc, date)
            handleNewTaskClose() 
        }
       
    }

    useEffect(() => {
        if (maxDate !== currentProjectDate) {
            setIsError(true)
            setDate("")
            setCurrentProjectDate(maxDate)
            console.log("this ran", date)
        }
        else {
            setIsError(false)
        }
    }, [maxDate])

  return (
    <div
        className='w-full min-h-36 h-full bg-BGS rounded-md px-4 py-4 pt-3 flex flex-col justify-between'
    >
        
        <div
            className='w-fit h-full flex flex-col gap-1 relative'
        >
            <i
                className={`p-2 absolute bg-BGS -top-1.5 -right-1.5 ${isError ? "block" : "hidden"} z-10`}
            >
                <svg className='text-rose-500' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m13.299 3.148l8.634 14.954a1.5 1.5 0 0 1-1.299 2.25H3.366a1.5 1.5 0 0 1-1.299-2.25l8.634-14.954c.577-1 2.02-1 2.598 0M12 4.898L4.232 18.352h15.536zM12 15a1 1 0 1 1 0 2a1 1 0 0 1 0-2m0-7a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/></g></svg>
            </i>
            <input 
                onChange={(e) => handleTitleChange(e)}
                value={title}
                type="text" 
                onClick={() => setIsError(false)}
                placeholder='Task title...'
                className='w-full outline-none text-sm font-medium placeholder:text-DText'
            />
            <textarea 
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                type="text"
                onClick={() => setIsError(false)}
                placeholder='Task description...'
                className='w-56 h-full min-h-16 resize-none no-scrollbar outline-none text-xs font-medium placeholder:text-DText text-CText/70'
                maxLength={130}
            ></textarea>
        </div>

        <div
            className='flex item-end justify-end w-full h-full '
        >
            <div
                className='flex flex-row items-end justify-between gap-1 w-full'
            >                
                <input 
                    type="date" 
                    value={date}
                    min={minDate}
                    max={maxDate}
                    onClick={() => setIsError(false)}
                    onChange={(e) => setDate(e.target.value)}
                    className='w-fit text-xs font-medium text-DText outline-none'
                />
                <div
                    className='w-full flex justify-end items-end gap-1'
                >
                    <button
                        onClick={() => handleNewTaskClose()}
                        className='p-2 rounded-sm bg-rose-500'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => addingTask()}
                        className='p-2 rounded-sm bg-Pr'
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        

    </div>
  )
}

export default NewTaskCard