import React, {useEffect, useState} from 'react'


const TaskCard = ({id, title, description, date, formattedDate, completed, projectId, projectName, deleteFunction, updateFunction}) => {

    // toggles
    const [isCompleted, setIsCompleted] = useState(completed || false)
    const [isEdit, setIsEdit] = useState(false)
    
    // input details
    const [newTitle, setNewTitle] = useState(title || "")
    const [newDescription, setNewDescription] = useState(description || "")


    // toggles the completed status between off and on
    const handleToggle = async () => {   
        updateFunction(id, newTitle, newDescription, date, formattedDate, !isCompleted, projectId, projectName)
        setIsCompleted(!isCompleted) 
    }

    // handle the title hook
    const handleTitleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 28) {
            setNewTitle(value);
        }
    }

    // handles updating the task
    const handleUpdate = async () => {

        updateFunction(id, newTitle, newDescription, date, formattedDate, completed, projectId, projectName)
        setIsEdit(false)

    }

    // handle close edit mode
    const handleExitEditMode = () => {

        setNewTitle(title)
        setNewDescription(description)
        setIsEdit(false)

    }

  return (
    <div
        className='w-full min-h-40 h-full bg-BGS rounded-md px-4 py-4 pt-3 flex flex-col justify-between'
    >
        {/* title and description inputs */}
        <div
            className='w-fit h-full flex flex-col gap-1'
        >
            <input 
                onChange={(e) => handleTitleChange(e)}
                value={newTitle}
                type="text" 
                placeholder='Task title...'
                className='w-48 outline-none text-sm font-medium placeholder:text-DText'
                readOnly={!isEdit}
            />
            <textarea 
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                type="text"
                placeholder='Task description...'
                className='w-56 h-full min-h-12 resize-none no-scrollbar outline-none text-xs font-medium placeholder:text-DText text-CText/70'
                maxLength={130}
                readOnly={!isEdit}
            ></textarea>
        </div>

        {/* project name and trash and toggle button */}
        <div
            className='flex item-end justify-end w-full h-full'
        >
            <div
                className='flex flex-row items-end justify-between gap-1 w-full'
            >                
                <p
                    className='text-xs font-medium text-DText'
                >
                    {projectName === null ? "No project" : projectName}
                </p>
                
                {
                    isEdit
                    ?   // true: close edit mode and update task
                        <div
                            className='flex flex-row items-center justify-start gap-1 w-fit'
                        >
                            <button
                                className='p-2 rounded-sm bg-rose-500'
                                onClick={() => handleExitEditMode()}
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                                </svg>
                            </button>
                            <button
                                onClick={() => handleUpdate()}
                                className='p-2 rounded-sm bg-Pr'
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                                </svg>
                            </button>

                        </div>  
                    :   // false: trash, edit and toggle button
                        <div
                            className='flex flex-row items-center justify-start gap-1 w-fit h-fit'
                        >
                            <button
                                className='p-2 rounded-sm bg-rose-500'
                                onClick={() => deleteFunction()}
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
                                </svg>
                            </button>
                            <button
                                className='p-2 rounded-sm bg-blue-500'
                                onClick={() => setIsEdit(true)}
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="m13.59,6L4.29,15.29c-.13.13-.22.29-.26.46l-1,4c-.09.34.01.7.26.95.19.19.45.29.71.29.08,0,.16,0,.24-.03l4-1c.18-.04.34-.13.46-.26l9.29-9.29-4.41-4.41Z"></path><path d="m21,4.59l-1.59-1.59c-.78-.78-2.05-.78-2.83,0l-1.59,1.59,4.41,4.41,1.59-1.59c.78-.78.78-2.05,0-2.83Z"></path>
                                </svg>
                            </button>
                            <button
                                onClick={() => handleToggle()}
                                className={`p-2 rounded-sm border flex items-center size-8 ${isCompleted && "bg-Pr"}`}
                            >
                                { 
                                    isCompleted
                                    &&  <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                            fill="currentColor" viewBox="0 0 24 24" >
                                            <path d="M12 5a7 7 0 1 0 0 14 7 7 0 1 0 0-14"></path>
                                        </svg>
                                }
                            </button>

                        </div>  
                }
            </div>
        </div>
        

    </div>
  )
}

export default TaskCard

// {
//   "taskId": 1,
//   "title": "this is a new task 3 edited",
//   "description": "this is a new task 3 edited",
//   "date": "2025/08/21",
//   "formattedDate": "21/08/2025",
//   "completed": false,
//   "projectId": null,
//   "id": 1
// }