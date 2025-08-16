import React, { useEffect, useState } from 'react'

const ProjectTaskCard = ({id, title, description, date, handleEditingTasks}) => {

  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const [newDate, setNewDate] = useState(date)
  const [isEdit, setIsEdit] = useState(false) // true: edit mode false: stops edit mode

  const editingTasks = () => {
      handleEditingTasks(id, newTitle, newDescription, newDate)
      setIsEdit(false)
  }
  
  useEffect(() => {
    console.log("new date", newDate)
  }, [newDate])

  return (
    <div
        className='w-full min-h-32 h-full bg-BGS rounded-md px-4 py-4 pt-3 flex flex-col justify-between'
    >
        <div
            className='w-fit h-full flex flex-col gap-1'
        >
          <input 
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            type="text" 
            placeholder='Task title...'
            className='w-full outline-none text-sm font-medium placeholder:text-DText'
            readOnly={!isEdit}
          />
          <textarea 
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            type="text"
            placeholder='Task description...'
            className='w-56 h-full min-h-16 resize-none no-scrollbar outline-none text-xs font-medium placeholder:text-DText text-CText/70'
            maxLength={130}
            readOnly={!isEdit}
          ></textarea>
        </div>
        <div
            className='flex item-end justify-end w-full h-full'
        >
            <div
                className='flex flex-row items-end justify-between gap-1 w-full'
            >                
                <input 
                    type="date" 
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className='w-fit text-xs font-medium text-DText outline-none'
                    readOnly={!isEdit}
                />
                {
                    isEdit
                    ?   // trash and edit button
                        <div
                            className='w-full flex justify-end items-end gap-1'
                        >
                            <button
                                onClick={() => setIsEdit(false)}
                                className='p-2 rounded-sm bg-rose-500'
                            >
                                {/* X */}
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path>
                                </svg>
                            </button>
                            <button
                                onClick={() => editingTasks()}
                                className='p-2 rounded-sm bg-Pr'
                            >
                                {/* check */}
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
                                </svg>
                            </button>
                        </div>
                    :    // close and edit button
                        <div
                            className='w-full flex justify-end items-end gap-1'
                        >
                            <button
                                onClick={() => {}}
                                className='p-2 rounded-sm bg-rose-500'
                            >
                                {/* trash */}
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
                                </svg>
                            </button>
                            <button
                                onClick={() => setIsEdit(true)}
                                className='p-2 rounded-sm bg-blue-500'
                            >
                                {/* pen */}
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                                    fill="currentColor" viewBox="0 0 24 24" >
                                    <path d="m19.41,3c-.78-.78-2.05-.78-2.83,0l-2.09,2.09-1.79-1.79c-.39-.39-1.02-.39-1.41,0l-6,6,1.41,1.41,5.29-5.29,1.09,1.09L4.29,15.29c-.13.13-.22.29-.26.46l-1,4c-.08.34.01.7.26.95.19.19.45.29.71.29.08,0,.16,0,.24-.03l4-1c.18-.04.34-.13.46-.26l12.29-12.29c.78-.78.78-2.05,0-2.83l-1.59-1.59Zm-11.93,15.1l-2.11.53.53-2.11L14.5,7.91l1.59,1.59-8.6,8.6Zm10.01-10.01l-1.59-1.59,2.09-2.09,1.59,1.58-2.09,2.09Z"></path>
                                </svg>
                            </button>
                        </div>
                }
                
            </div>
        </div>
    </div>
  )
}

export default ProjectTaskCard