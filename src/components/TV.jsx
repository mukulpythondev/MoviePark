import { useEffect, useState } from 'react';
import Topnav from '../template/Topnav';
import Dropdown from '../template/Dropdown';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loader from './Loader';
import Cards from '../template/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import GotoTop from './GotoTop';

const TV = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = `MoviePark | TV Shows`;

  const getTV = async () => {
    try {
      const { data } = await axios.get(
        `/tv/${category}?page=${page}`
      );
      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const referenceHandler = async () => {
    if (tv.length === 0) {
      getTV();
    } else {
      setPage(1);
      setTv([]);
      getTV();
    }
  };

  useEffect(() => {
    referenceHandler();
  }, [category]);

  return tv.length > 0 ? (
    <>
      <div className='w-screen h-screen'>
        <div className='w-full flex flex-col md:flex-row md:px-16 md:py-5 px-2 py-4 md:gap-10 md:items-center'>
          <h1 className='items-center flex gap-3 w-full md:w-4/12 text-zinc-400 font-bold'>
            <FaRegArrowAltCircleLeft onClick={() => navigate(-1)} className='text-3xl hover:text-custompurple duration-100 cursor-pointer' />
            <span className='text-3xl'>TV Shows <span className='text-lg text-zinc-500'>({category})</span></span>
          </h1>
          <div className='md:w-[80%] w-full flex flex-col md:flex-row gap-y-3 md:gap-10 items-center'>
            <Topnav customclass='md:w-[70%] w-full md:ml-16' />
            <div className='flex gap-10'>
              <Dropdown title={"Category"} func={(e) => setCategory(e.target.value)} options={["top_rated", "popular", "on_the_air", "airing_today"]} />
            </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={tv.length}
          next={getTV}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards cardData={tv} title={"tv"} />
        </InfiniteScroll>
        <GotoTop />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default TV;
