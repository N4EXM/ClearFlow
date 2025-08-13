import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({loading}) => {

    let location = useLocation()

  return (
    <div
        className={`duration-200 opacity-0 ${loading && "opacity-100"} pb-6 w-full bg-BGS p-4 px-10 ${location.pathname !== "/newProject" ? "flex" : "hidden"} flex-row items-center justify-between text-white fixed bottom-0 left-0 border-t-2 border-separator`}
    >
        <Link
            to={"/"}
            className={`${location.pathname === "/" && "text-Pr"} relative`}
        >
            <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="m12.71,2.29c-.39-.39-1.02-.39-1.41,0L3.29,10.29c-.19.19-.29.44-.29.71v9c0,1.1.9,2,2,2h4c.55,0,1-.45,1-1v-6h4v6c0,.55.45,1,1,1h4c1.1,0,2-.9,2-2v-9c0-.27-.11-.52-.29-.71L12.71,2.29Zm3.29,17.71v-5c0-1.1-.9-2-2-2h-4c-1.1,0-2,.9-2,2v5h-3v-8.59l7-7,7,7v8.59s-3,0-3,0Z"></path>
            </svg>
            {location.pathname === "/" && 
                <svg className='absolute -bottom-3 left-2.5' xmlns="http://www.w3.org/2000/svg" width="8" height="8"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M12 5a7 7 0 1 0 0 14 7 7 0 1 0 0-14"></path>
                </svg>
            }
        </Link>
        <div
            className='w-fit h-fit flex pt-1'
        >
            <Link
                className='p-3 w-fit  h-fit bg-Pr rounded-full'
                to={'/newProject'}
            >
                <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
                </svg>
            </Link>
        </div>  
        <Link
            to={"/CalendarPage"}
            className={`${location.pathname === "/CalendarPage" && "text-Pr"} flex flex-col gap-1 items-center relative`}
        >
            <svg  xmlns="http://www.w3.org/2000/svg" width="28" height="28"  
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="m19,4h-2v-2h-2v2h-6v-2h-2v2h-2c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2V6c0-1.1-.9-2-2-2ZM5,20v-12h14v-2,14s-14,0-14,0Z"></path><path d="M7 11H9V13H7z"></path><path d="M11 11H13V13H11z"></path><path d="M15 11H17V13H15z"></path><path d="M7 15H9V17H7z"></path><path d="M11 15H13V17H11z"></path><path d="M15 15H17V17H15z"></path>
            </svg>
            {location.pathname === "/CalendarPage" && 
                <svg className='absolute -bottom-3 left-2.5' xmlns="http://www.w3.org/2000/svg" width="8" height="8"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <path d="M12 5a7 7 0 1 0 0 14 7 7 0 1 0 0-14"></path>
                </svg>
            }
        </Link>

    </div>
  )
}

export default Navbar