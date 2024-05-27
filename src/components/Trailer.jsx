import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import NotFound from './NotFound'

const Trailer = () => {
    const {pathname}= useLocation()
    const navigate= useNavigate()
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category]?.info?.video);
  
  return (
    <div  className='h-full w-screen  flex  items-start py-[5%] absolute z-40 top-0 left-0  justify-center  bg-[rgba(0,0,0,.8)]' >
         <IoMdCloseCircleOutline onClick={()=> navigate(-1) } className='hover:text-custompurple duration-100 text-zinc-200 text-4xl absolute z-50 top-5 right-5 md:top-10  md:right-28    cursor-pointer' />
       <div className='h-2/6 mt-10 md:mt-0 md:h-4/6 w-10/12' >
       { ytvideo ?   <ReactPlayer  controls={true} height={"100%"} width={"100%"}  url={`https://www.youtube.com/watch?v=${ytvideo.key}`} /> : <NotFound/> }
       </div>
           
    </div>
  )
}

export default Trailer