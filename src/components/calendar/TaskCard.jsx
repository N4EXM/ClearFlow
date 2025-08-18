import React, {useState} from 'react'

const TaskCard = ({title, description, projectName, deleteFunction}) => {

    const [completed, setCompleted] = useState(false)

    const handleToggle = () => {
        setCompleted(!completed)
    }

  return (
    <div
        className='w-full min-h-32 h-full bg-BGS rounded-md px-4 py-4 pt-3 flex flex-col justify-between'
    >
        {/* title and description inputs */}
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

        {/* project name and trash and toggle button */}
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
                <div
                    className='flex flex-row items-center justify-start gap-1'
                >
                    <button
                        className='p-2 rounded-sm bg-rose-500'
                        onClick={deleteFunction}
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                            fill="currentColor" viewBox="0 0 24 24" >
                            <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => handleToggle()}
                        className={`p-2 rounded-sm border flex items-center justify-center size-8 ${completed ? "bg-Pr" : ""}`}
                    >
                        {
                            completed
                            ?   <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"></path>
                                </svg>
                            :   ""
                        }
                    </button>

                </div>
            </div>
        </div>
        

    </div>
  )
}

export default TaskCard