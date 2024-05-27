import React, { useState } from 'react';
import { BiSolidMoviePlay } from 'react-icons/bi';
import { FaFire, FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { RiMenu5Fill, RiTvFill } from 'react-icons/ri';
import { SiGooglegemini } from 'react-icons/si';
import { TbInfoHexagonFilled } from 'react-icons/tb';
import { TiGroup } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const feeds = [
    { name: "Trending", icon: <FaFire />, link: "/trending" },
    { name: "Popular", icon: <SiGooglegemini />, link: "popular" },
    { name: "Movies", icon: <BiSolidMoviePlay />, link: "movie" },
    { name: "TV Shows", icon: <RiTvFill />, link: "tv" },
    { name: "People", icon: <TiGroup />, link: "person" }
  ];

  return (
    <>
      {/* Backdrop for mobile view */}
      {showMenu && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden'
          onClick={() => setShowMenu(false)}
        ></div>
      )}

      <div className='md:w-[20%] gap-x-5 md:gap-0 w-full md:border-r-[0.8px] flex md:flex-col py-3 border-zinc-400 md:h-full md:py-8 md:px-10 relative'>
        <h1 className='text-white ml-2 text-3xl font-bold'>
          Movie<span className='text-custompurple font-black italic text-3xl'>Park</span>
        </h1>

        {/* Mobile Menu Icon */}
        <h1
          onClick={() => setShowMenu(!showMenu)}
          className='text-3xl duration-300 md:hidden visible absolute z-50 right-5 top-5 text-zinc-200'
        >
          {showMenu ? <IoMdClose /> : <RiMenu5Fill />}
        </h1>

        {/* Sidebar Menu */}
        <div
          className={`mt-10 md:relative  md:right-0 rounded-lg p-3 md:p-0 md:bg-transparent absolute md:w-full h-4/6 backdrop-blur-lg md:h-full md:block ${
            showMenu ? 'block' : 'hidden'
          } md:visible z-50`}
        >
          <nav className='gap-1 flex flex-col'>
            <h2 className='md:text-2xl text-xl text-white mb-2 font-semibold'>New Feeds</h2>
            {feeds.map((feed, index) => (
              <Link
                to={feed.link}
                key={index}
                className='md:text-xl flex text-3xl h-10 md:h-12 duration-300 text-zinc-400 md:px-5 md:flex md:items-center gap-1 md:py-2 rounded-md hover:bg-custompurple hover:text-zinc-100'
                onClick={() => setShowMenu(false)}
              >
                {feed.icon}
                <span className='text-xl'>{feed.name}</span>
              </Link>
            ))}
          </nav>
          <hr className='border-none h-[1px] my-2 bg-zinc-400' />
          <nav className='gap-1 flex flex-col'>
            <h2 className='md:text-xl text-white hidden md:block text-sm md:mb-2 font-semibold'>Website Information</h2>
            <Link
              to={'/about'}
              className='md:text-xl flex text-3xl gap-1 md:justify-start md:items-center duration-300 text-zinc-400 md:px-5 py-2 rounded-md hover:bg-custompurple hover:text-zinc-100'
              onClick={() => setShowMenu(false)}
            >
              <TbInfoHexagonFilled />
              <span className='text-xl'>About Us</span>
            </Link>
            <div className='md:text-4xl mt-2 flex text-3xl gap-5 md:gap-5 md:justify-start md:items-center duration-300 text-zinc-400 md:px-5 py-2 rounded-md hover:text-zinc-100'>
              <a
                className='hover:text-custompurple duration-100'
                href='https://www.linkedin.com/in/mukul-webdev'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin />
              </a>
              <a
                className='hover:text-custompurple duration-100'
                href='https://github.com/mukulpythondev/MoviePark'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
