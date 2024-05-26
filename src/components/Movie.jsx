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

const Movie = () => {
    const navigate= useNavigate()
    const [category, setcategory] = useState("now_playing")
      const [movie,setmovie] =useState([])
      const [page,setpage] =useState(1)
      const [hasMore, sethasMore]= useState(true)
      document.title = `MoviePark | Movies  `  ;
    const getMovie = async () => { 
        try {
          const { data } = await axios.get(
            `/movie/${category}?page=${page}`
          );
          if (data.results.length > 0) {
            setmovie((prevState) => [...prevState, ...data.results]);
            setpage(page + 1);
          } else {
            sethasMore(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
    
      const referenceHandler = async () => {
        if (movie.length === 0) {
          getMovie();
        } else {
          setpage(1);
          setmovie([]);
          getMovie();
        }
      };
    useEffect(()=>{
        referenceHandler()
    },[category])
    return movie.length >0 ? (
        <>
        {/* <Sidebar/> */}
        <div className='w-screen h-screen' >
          <div className='w-full flex  px-16 py-5 gap-10 items-center  ' >
                <h1 className=' w-4/12  items-center flex gap-3 text-zinc-400 font-bold' >
                <FaRegArrowAltCircleLeft onClick={()=> navigate(-1) } className='text-2xl hover:text-custompurple duration-100  cursor-pointer' />
                 <span className='text-3xl' >Movies <span className='text-lg text-zinc-500' >({category})</span> </span>
                  </h1>
          <Topnav customclass="w-[70%]  "  />
          <Dropdown title={"Category"} func={(e)=> setcategory(e.target.value) } options={["now_playing","popular", "upcoming", "top_rated"]} />
          </div>
          <InfiniteScroll
            dataLength={movie.length}
            next={getMovie}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
          >
            <Cards cardData={movie} title={"movie"} />
          </InfiniteScroll>
          <GotoTop/>
        </div>
      </>
      ): <Loader/>
}

export default Movie