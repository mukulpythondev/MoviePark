import axios from '..//utils/axios'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoCloseSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Noimage from '../../public/noimage.jpg'
const Topnav = () => {
     const [query, setquery] = useState("")
     const [search, setsearch] = useState([])
     const getsearches=async () => {
      try {
        const {data}= await axios.get(`/search/multi?query=${query}`)
        setsearch(data.results)
      } catch (error) {
         console.log(error) 
      }
    }
     useEffect( ()=> {
          getsearches()
     },[query])
  
     
  return (
    <div className='h-7vh  relative  gap-6 p-4 flex items-center ml-40 ' >
        <BiSearch className='text-zinc-400 text-3xl' />
        <input value={query} onChange={(e)=> setquery(e.target.value) } className='w-1/2 text-xl bg-transparent p-2  outline-none border-none text-zinc-100  rounded-lg  ' type="text" placeholder='Search anything...' name="" id="" />
      {query.length> 0 &&   <IoCloseSharp onClick={()=> setquery("") }  className=' cursor-pointer text-zinc-400 text-3xl' /> }
        { query.length >0 && <div className='absolute bg-customblack overflow-auto left-16 w-6/12 flex flex-col  top-[90%] rounded-lg   h-[50vh] ' >
              {search.map((item,index)=>  <Link className=" font-semibold duration-300 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-200 flex p-4 border-b-2 border-zinc-100 w-full justify-start gap-3 items-center " >
                <img className='h-20 w-24 rounded-md object-cover shadow  ' src={item.profile_path ===null || item.backdrop_path === null ? Noimage : `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path }`} alt="" />
               <h3 key={index} > {item.original_title || item.title || item.name ||  item.original_name }  </h3></Link> )}
        </div> }
    </div>
  )
}

export default Topnav