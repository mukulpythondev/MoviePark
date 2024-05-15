import React, { useEffect, useState } from 'react'
import Topnav from '../template/Topnav'
import Dropdown from '../template/Dropdown'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import Loader from './Loader'
import Cards from '../template/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import GotoTop from './GotoTop'
const Trending = () => {
  const navigate= useNavigate()
  const [category, setcategory] = useState("all")
    const [duration, setduration] = useState("day")
    const [trending,settrending] =useState([])
    const [page,setpage] =useState(1)
    const [hasMore, sethasMore]= useState(true)
    document.title = " MovieLabs | Trending " + category.toUpperCase();

    const getTrending = async () => { 
      try {
        const { data } = await axios.get(
          `/trending/${category}/${duration}?page=${page}`
        );
        if (data.results.length > 0) {
          settrending((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          sethasMore(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const referenceHandler = async () => {
      if (trending.length === 0) {
        getTrending();
      } else {
        setpage(1);
        settrending([]);
        getTrending();
      }
    };
  useEffect(()=>{
      referenceHandler()
  },[category,duration])
  return trending.length >0 ? (
    <>
    {/* <Sidebar/> */}
    <div className='w-screen h-screen    ' >
      <div className='w-full flex px-16 py-5  gap-10 items-center  ' >
            <h1 className='  items-center flex gap-3 text-zinc-400 font-bold' >
            <FaRegArrowAltCircleLeft onClick={()=> navigate(-1) } className='text-2xl hover:text-custompurple duration-100  cursor-pointer' />
             <span className='text-3xl' >Trending</span>
              </h1>
      <Topnav customclass="w-[70%] ml-16 "  />
      <Dropdown title={"Category"} func={(e)=> setcategory(e.target.value) } options={["all", "movie","tv"]} />
      <Dropdown title={"Duration"} func={(e)=> setduration(e.target.value) }  options={["week", "day"]} />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards cardData={trending} title={category} />
      </InfiniteScroll>
      <GotoTop/>
    </div>
  </>
  ): <Loader/>
}

export default Trending