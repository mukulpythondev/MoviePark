import { useEffect, useState } from 'react';
import Topnav from '../template/Topnav';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loader from './Loader';
import Cards from '../template/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import GotoTop from './GotoTop';

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = `MoviePark | Popular Celebrity`;

  const getPeople = async () => {
    try {
      const { data } = await axios.get(
        `/person/${category}?page=${page}`
      );
      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const referenceHandler = async () => {
    if (people.length === 0) {
      getPeople();
    } else {
      setPage(1);
      setPeople([]);
      getPeople();
    }
  };

  useEffect(() => {
    referenceHandler();
  }, [category]);

  return people.length > 0 ? (
    <>
      <div className='w-screen h-screen'>
        <div className='w-full flex flex-col md:flex-row md:px-16 md:py-5 px-2 py-4 md:gap-10 md:items-center'>
          <h1 className='items-center flex gap-3 md:4/12 w-full text-zinc-400 font-bold'>
            <FaRegArrowAltCircleLeft onClick={() => navigate(-1)} className='text-2xl hover:text-custompurple duration-100 cursor-pointer' />
            <span className='text-3xl'>Popular Personality</span>
          </h1>
          <div className='md:w-[80%] w-full flex flex-col md:flex-row gap-y-3 md:gap-10 items-center'>
            <Topnav customclass='md:w-[70%] w-full md:ml-16' />
          </div>
        </div>
        <InfiniteScroll
          dataLength={people.length}
          next={getPeople}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards cardData={people} title={"person"} />
        </InfiniteScroll>
        <GotoTop />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default People;
