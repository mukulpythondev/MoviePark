import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../utils/axios'
import Topnav from '../template/Topnav'
import Dropdown from '../template/Dropdown'
import Loader from './Loader'
import Cards from '../template/Cards'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import GotoTop from "./GotoTop"
const Popular = () => {
    const navigate= useNavigate()
    const [category, setcategory] = useState("movie")
      const [popular,setpopular] =useState([])
      const [page,setpage] =useState(1)
      const [hasMore, sethasMore]= useState(true)
      document.title = " MovieLabs | Popular " + category.toUpperCase();
      const getPopular = async () => { 
        try {
          const { data } = await axios.get(
            `/${category}/popular?page=${page}`
          );
          if (data.results.length > 0) {
            setpopular((prevState) => [...prevState, ...data.results]);
            setpage(page + 1);
          } else {
            sethasMore(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
    
      const referenceHandler = async () => {
        if (popular.length === 0) {
          getPopular();
        } else {
          setpage(1);
          setpopular([]);
          getPopular();
        }
      };
    useEffect(()=>{
        referenceHandler()
    },[category])
    console.log(popular)
    return popular.length >0 ? (
        <>
        {/* <Sidebar/> */}
        <div className='w-screen h-screen' >
          <div className='w-full flex  px-16 py-5 gap-10 items-center  ' >
                <h1 className='  items-center flex gap-3 text-zinc-400 font-bold' >
                <FaRegArrowAltCircleLeft onClick={()=> navigate(-1) } className='text-2xl hover:text-custompurple duration-100  cursor-pointer' />
                 <span className='text-3xl' >Popular</span>
                  </h1>
          <Topnav customclass="w-[70%] ml-16 "  />
          <Dropdown title={"Category"} func={(e)=> setcategory(e.target.value) } options={["movie","tv"]} />
          </div>
          <InfiniteScroll
            dataLength={popular.length}
            next={getPopular}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
          >
            <Cards cardData={popular} title={category} />
          </InfiniteScroll>
          <GotoTop/>
        </div>
      </>
      ): <Loader/>
}

export default Popular