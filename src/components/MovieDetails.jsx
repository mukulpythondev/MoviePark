import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchmovie } from '../Store/Actions/MovieAction';
import { removemovie } from '../Store/Reducers/MovieSlice';
import { FaExternalLinkAlt, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { FaCirclePlay, FaImdb } from "react-icons/fa6";
import { CiGlobe } from 'react-icons/ci';
import Loader from './Loader';
import HorizontalCard from '../template/HorizontalCard';

const MovieDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector(state => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div 
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.profile_path})`,
        backgroundPosition: "center", 
        backgroundSize: "cover"
      }} 
      className="w-screen relative h-fit py-3 px-4 md:px-[10%]"
    >
      {/* Nav Section */}
      <nav className="flex h-[10vh] w-full items-center gap-5 text-3xl text-zinc-100 font-bold">
        <FaRegArrowAltCircleLeft 
          onClick={() => navigate(-1)} 
          className="hover:text-custompurple duration-100 cursor-pointer" 
        />
        <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
          <FaImdb className="hover:text-custompurple duration-100 ml-5 cursor-pointer" />
        </a>
        {info.detail.homepage.length > 0 && (
          <a target="_blank" href={`${info.detail.homepage}`}>
            <FaExternalLinkAlt className="hover:text-custompurple duration-100 text-2xl cursor-pointer" />
          </a>
        )}
        {info.externalid.wiki_data_id && (
          <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
            <CiGlobe className="hover:text-custompurple duration-100 cursor-pointer" />
          </a>
        )}
      </nav>
      {/* Poster Image and Movie Details */}
      <div className="w-full flex flex-col md:flex-row gap-10 py-5">
        <img
          className="h-[50vh] w-full md:w-56 rounded-md object-cover"
          src={`https://image.tmdb.org/t/p/original${info.detail.poster_path || info.detail.backdrop_path}`}
          alt=""
        />
        <div className="flex flex-col gap-y-2 text-white">
          <h1 className="text-white text-3xl md:text-5xl font-black uppercase">
            {info.detail.original_title || info.detail.title || info.detail.name || info.detail.original_name}
            <small className="text-xl md:text-2xl text-zinc-200"> ({info.detail.release_date.split('-')[0]}) </small>
          </h1>
          {/* Movie Details */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-white border-red-600 border-2 w-fit opacity-90 rounded-full">
              <p className="text-sm font-normal px-2 py-3">{(info.detail.vote_average * 10).toFixed()}%</p>
            </div>
            <h3 className="text-zinc-200 font-semibold">User Score</h3>
            <h1 className="text-lg md:text-xl font-semibold text-yellow-600">{info.detail.release_date}</h1>
            <h2 className="text-lg md:text-xl font-normal text-zinc-300">{info.detail.genres.map(g => g.name).join(', ')}</h2>
            <h2 className="text-lg md:text-xl font-semibold text-gray-100">{info.detail.runtime} min</h2>
          </div>
          <h2 className="text-xl text-zinc-200 font-semibold italic">{info.detail.tagline}</h2>
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p>{info.detail.overview}</p>
          <Link 
            to={`${pathname}/trailer`} 
            className="hover:bg-violet-600 duration-100 flex items-center gap-1 bg-custompurple w-fit px-4 rounded-xl py-2"
          >
            <FaCirclePlay /> Play Trailer
          </Link>
        </div>
      </div>
      {/* Watch Platforms */}
      <div className="flex flex-col gap-y-3">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-4 items-center">
            <h1 className="text-sm font-bold text-zinc-100">Available on Platform:</h1>
            {info.watchproviders.flatrate.map(w => (
              <img 
                key={w.logo_path} 
                title={w.provider_name} 
                className="h-7 rounded-md w-7 object-cover" 
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} 
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-4 items-center">
            <h1 className="text-sm font-bold text-zinc-100">Available on Rent:</h1>
            {info.watchproviders.rent.map(w => (
              <img 
                key={w.logo_path} 
                title={w.provider_name} 
                className="h-7 rounded-md w-7 object-cover" 
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} 
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-4 items-center">
            <h1 className="text-sm font-bold text-zinc-100">Available to Buy:</h1>
            {info.watchproviders.buy.map(w => (
              <img 
                key={w.logo_path} 
                title={w.provider_name} 
                className="h-7 rounded-md w-7 object-cover" 
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} 
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>
      <hr className="mt-7 border-none h-[2px] bg-zinc-400 mb-3" />
      <>
        <h1 className="text-2xl font-bold text-white">{info.recommendation.length > 0 ? "Recommended" : "Similar"}</h1>
        <HorizontalCard trendingdata={info.recommendation.length > 0 ? info.recommendation : info.similar} />
      </>
      <Outlet />
    </div>
  ) : <Loader />;
}

export default MovieDetails;
