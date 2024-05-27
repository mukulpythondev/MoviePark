import React, { useEffect, useState } from 'react';
import Topnav from '../template/Topnav';
import Dropdown from '../template/Dropdown';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loader from './Loader';
import Cards from '../template/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import GotoTop from './GotoTop';

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = `MoviePark | Movies`;

  const getMovie = async () => {
    try {
      const { data } = await axios.get(
        `/movie/${category}?page=${page}`
      );
      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const referenceHandler = async () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    referenceHandler();
  }, [category]);

  return movie.length > 0 ? (
    <>
      <div className='w-screen h-screen'>
        <div className='w-full flex flex-col md:flex-row md:px-16 md:py-5 px-2 py-4 md:gap-10 md:items-center'>
          <h1 className='items-center flex gap-3  w-full md:w-4/12 text-zinc-400 font-bold'>
            <FaRegArrowAltCircleLeft onClick={() => navigate(-1)} className='text-3xl hover:text-custompurple duration-100 cursor-pointer' />
            <span className='text-3xl'>Movies <span className='text-lg text-zinc-500'>({category})</span></span>
          </h1>
          <div className='md:w-[80%] w-full flex flex-col md:flex-row gap-y-3 md:gap-10 items-center'>
            <Topnav customclass='md:w-[70%] w-full md:ml-12' />
            <div className='flex gap-10'>
              <Dropdown title={"Category"} func={(e) => setCategory(e.target.value)} options={["now_playing", "popular", "upcoming", "top_rated"]} />
            </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={movie.length}
          next={getMovie}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards cardData={movie} title={"movie"} />
        </InfiniteScroll>
        <GotoTop />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Movie;
