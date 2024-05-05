import React from 'react'
import { BiSolidMoviePlay } from 'react-icons/bi'
import { FaFire } from 'react-icons/fa'
import { MdPhoneInTalk } from 'react-icons/md'
import { RiTvFill } from 'react-icons/ri'
import { SiGooglegemini } from 'react-icons/si'
import { TbInfoHexagonFilled } from 'react-icons/tb'
import { TiGroup } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const feeds=[{name:"Trending", icon:<FaFire />, link:"/trending"}, {name:"Popular", icon:<SiGooglegemini />, link:"popular"}, {name:"Movies", icon:<BiSolidMoviePlay />, link:"movie"}, {name:"TV Shows", icon:<RiTvFill />, link:"tv"}, {name:"People", icon:<TiGroup />, link:"people"}]
  return (
    <>
    <div className='w-[20%] border-r-[0.8px] flex flex-col  border-zinc-400 h-full py-8 px-10 ' >
      <h1 className='text-white text-3xl font-bold' > Movie<span className='text-custompurple font-black italic text-3xl  ' >X</span>Play </h1>
      <nav className='mt-10 gap-1 flex flex-col' >
        <h2 className='text-2xl text-white mb-2 font-semibold' >New Feeds</h2>
        {feeds.map((feed,index)=>( <Link to={feed.link} key={index} className='text-xl duration-300 text-zinc-400 px-5 flex items-center gap-1 py-2 rounded-md  hover:bg-custompurple hover:text-zinc-100 ' > {feed.icon} {feed.name} </Link> ))}
      </nav>
      <hr className='border-none h-[1px] my-2 bg-zinc-400'  />

         <nav  className='gap-1 flex flex-col'>
         <h2 className='text-xl text-white mb-2 font-semibold' > Website Information </h2>
         <Link  className='text-xl flex gap-1 justify-start items-center duration-300 text-zinc-400 px-5 py-2 rounded-md  hover:bg-custompurple hover:text-zinc-100 ' > <TbInfoHexagonFilled /> About Us </Link>
         <Link  className='text-xl flex gap-1 justify-start items-center duration-300 text-zinc-400 px-5 py-2 rounded-md  hover:bg-custompurple hover:text-zinc-100 ' > <MdPhoneInTalk /> Contact Us </Link>
         </nav>
    </div>
    </>
  )
}

export default Sidebar