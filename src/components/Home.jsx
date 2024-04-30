import React, { useEffect, useState } from 'react'
import Sidebar from '../template/Sidebar'
import Topnav from '../template/Topnav'
import axios from '../utils/axios'
import Header from '../template/Header'
import HorizontalCard from '../template/HorizontalCard'
import Dropdown from '../template/Dropdown'
const Home = () => {
  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [category, setcategory] = useState("all")
  const getwallpaper= async ()=>{
    try {
      const {data} = await axios.get(`/trending/all/day`)
          let currentWallpaper= (Math.random() * data.results.length).toFixed()
           setwallpaper(data.results[currentWallpaper])
    } catch (error) {
       console.log(error) 
    }
  }
  const trendingcards= async ()=>{
    try {
      const {data} = await axios.get(`/trending/${category}/day`)
         settrending(data.results)
    } catch (error) {
       console.log(error) 
    }
  }
  useEffect(()=>{
     !wallpaper && getwallpaper()
   trendingcards()
  },[category])

  return wallpaper && trending ? (
    <>
      <Sidebar/>
      <div className='w-[80%] h-full overflow-x-hidden overflow-y-auto ' >
        <Topnav/>
        <Header data={wallpaper} />
        <div className='px-5 py-3 flex justify-between' >
              <h1 className='text-3xl text-zinc-400 font-bold' >Trending-{category.toUpperCase()} </h1>
              <Dropdown func={(e)=>setcategory(e.target.value)}  title={"Filter"} options={["all", "movie","tv"]} />
        </div>
        <HorizontalCard trendingdata={trending} />
      </div>
    </>
  ) : <h3> Loading... </h3>
}

export default Home