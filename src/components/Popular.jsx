import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios';
import Topnav from '../template/Topnav';
import Dropdown from '../template/Dropdown';
import Loader from './Loader';
import Cards from '../template/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import GotoTop from "./GotoTop";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "MoviePark | Popular " + category.toUpperCase();

  const getPopular = async () => {
    try {
      const { data } = await axios.get(
        `/${category}/popular?page=${page}`
      );
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const referenceHandler = async () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    referenceHandler();
  }, [category]);

  return popular.length > 0 ? (
    <>
      {/* <Sidebar/> */}
      <div className='w-screen h-screen'>
        <div className='w-full flex flex-col md:flex-row md:px-16 md:py-5 px-2 py-4 md:gap-10 md:items-center'>
          <h1 className='items-center flex gap-3 text-zinc-400 font-bold'>
            <FaRegArrowAltCircleLeft onClick={() => navigate(-1)} className='text-3xl hover:text-custompurple duration-100 cursor-pointer' />
            <span className='text-3xl'>Popular</span>
          </h1>
          <div className='md:w-[80%] w-full flex flex-col md:flex-row gap-y-3 md:gap-10 items-center'>
            <Topnav customclass='md:w-[70%] w-full md:ml-16' />
            <div className='flex gap-10'>
              <Dropdown title={"Category"} func={(e) => setCategory(e.target.value)} options={["movie", "tv"]} />
            </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards cardData={popular} title={category} />
        </InfiniteScroll>
        <GotoTop />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Popular;
