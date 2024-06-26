import React from 'react'
import { CgMediaPodcast } from 'react-icons/cg'
import { GrAnnounce } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const Header = ({data}) => {
  return (
   <>
    <div style={{background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path })`,
backgroundPosition:"top 10%", backgroundSize:"cover"
}} className='md:h-[52vh]  h-[40vh] md:px-10 px-2 flex flex-col text-zinc-100 py-2 md:justify-normal justify-end md:py-32  w-full  ' >
    <h1 className='text-zinc-100 md:w-8/12 text-3xl  md:text-5xl font-black uppercase' >  {data.original_title || data.title || data.name ||  data.original_name }  </h1>
    <p className='mt-2 md:block hidden w-8/12' > {data.overview.slice(0,150)}...<Link to={`/${data.media_type}/details/${data.id}/trailer`} className='text-blue-400' >more</Link> </p>
    <div className='flex items-center gap-5 mt-2' >
    <Link to={`/${data.media_type}/details/${data.id}${data.release_date ? "/trailer" : ''}`} className=' mt-2 hover:scale-95 duration-100  bg-violet-700 w-fit px-2 md:px-4 rounded-xl  py-2' > { data.release_date ? "Watch Trailer" :"Know More"  } </Link>
      <p className='text-red-600 font-semibold text-lg flex items-center gap-1' >  <GrAnnounce /> {data.release_date  || "Coming soon.." }</p> 
    <p className='text-yellow-600 font-semibold text-sm md:text-lg flex items-center gap-1 ' > <CgMediaPodcast />  {data.media_type.toUpperCase()} </p>
    </div>
   
    </div>
   </>
  )
}

export default Header