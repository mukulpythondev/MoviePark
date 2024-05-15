import { useEffect, useState } from 'react'
import Topnav from '../template/Topnav'
import Dropdown from '../template/Dropdown'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import Loader from './Loader'
import Cards from '../template/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import GotoTop from './GotoTop'

const TV = () => {
    const navigate= useNavigate()
    const [category, setcategory] = useState("airing_today")
      const [tv,settv] =useState([])
      const [page,setpage] =useState(1)
      const [hasMore, sethasMore]= useState(true)
      document.title = `MovieLabs | TV Shows  `  ;
      
    const getTV = async () => { 
        try {
          const { data } = await axios.get(
            `/tv/${category}?page=${page}`
          );
          if (data.results.length > 0) {
            settv((prevState) => [...prevState, ...data.results]);
            setpage(page + 1);
          } else {
            sethasMore(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
    
      const referenceHandler = async () => {
        if (tv.length === 0) {
          getTV();
        } else {
          setpage(1);
          settv([]);
          getTV();
        }
      };
    useEffect(()=>{
        referenceHandler()
    },[category])
    return tv.length >0 ? (
        <>
        {/* <Sidebar/> */}
        <div className='w-screen h-screen' >
          <div className='w-full flex  px-16 py-5 gap-10 items-center  ' >
                <h1 className=' w-4/12  items-center flex gap-3 text-zinc-400 font-bold' >
                <FaRegArrowAltCircleLeft onClick={()=> navigate(-1) } className='text-2xl hover:text-custompurple duration-100  cursor-pointer' />
                 <span className='text-3xl' >TV Shows <span className='text-lg text-zinc-500' >({category})</span> </span>
                  </h1>
          <Topnav customclass="w-[70%]  "  />
          <Dropdown title={"Category"} func={(e)=> setcategory(e.target.value) } options={["top_rated","popular", "on_the_air", "airing_today"]} />
          </div>
          <InfiniteScroll
            dataLength={tv.length}
            next={getTV}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
          >
            <Cards cardData={tv} title={"tv"} />
          </InfiniteScroll>
          <GotoTop/>
        </div>
      </>
      ): <Loader/>
}

export default TV