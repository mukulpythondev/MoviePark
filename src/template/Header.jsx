import React from 'react'
import { CgMediaPodcast } from 'react-icons/cg'
import { GrAnnounce } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const Header = ({data}) => {
  return (
   <>
    <div style={{background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path })`,
backgroundPosition:"top 10%", backgroundSize:"cover"
}} className='h-[52vh] px-10 flex flex-col text-zinc-100 py-32  w-full  ' >
    <h1 className='text-zinc-100 w-8/12 text-5xl font-black uppercase' >  {data.original_title || data.title || data.name ||  data.original_name }  </h1>
    <p className='mt-2 w-8/12' > {data.overview.slice(0,150)}...<Link className='text-blue-400' >more</Link> </p>
    <div className='flex items-center gap-5 mt-2' >
      <p className='text-red-600 font-semibold text-lg flex items-center gap-1' >  <GrAnnounce /> {data.release_date  || "Coming soon - date to be announced" }</p> 
    <p className='text-yellow-600 font-semibold text-lg flex items-center gap-1 ' > <CgMediaPodcast />  {data.media_type.toUpperCase()} </p>
    </div>
    <Link className=' mt-2 hover:scale-95 duration-100  bg-custompurple w-fit px-4 rounded-xl  py-2' > Watch Now! </Link>
    </div>
   </>
  )
}

export default Header