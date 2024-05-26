import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchperson } from "../Store/Actions/PersonAction";
import { removeperson } from "../Store/Reducers/PersonSlice";
import Loader from "./Loader";
import {
  FaFacebook,
  FaImdb,
  FaInstagram,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import HorizontalCard from "../template/HorizontalCard";
import Dropdown from '../template/Dropdown'

const PersonDetail = () => {
  const { pathname } = useLocation();
  const [category, setcategory] = useState("movie")
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  const creditsKey = category + "credits";
  console.log(info);
  return info ? (
    <div className="w-screen  h-fit pb-10 bg-customblack px-[7%]">
      {/* Navbar */}
      <nav className="flex h-[10vh] w-full items-center gap-5 text-3xl text-zinc-100 font-bold ">
        <FaRegArrowAltCircleLeft
          onClick={() => navigate(-1)}
          className="hover:text-custompurple text-zinc-200 duration-100 text-3xl font-bold   cursor-pointer"
        />
      </nav>
      <div className="w-full flex  gap-10" >
        {/* image and personal details  */}
      <div className=" w-[20%]  flex gap-y-1 flex-col ">
        <img
          className="h-[50vh] w-56 rounded-md object-cover"
          src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
          alt=""
        />
        <hr className="mt-2 border-none h-[2px] w-56 bg-zinc-400 mb-1 " />
        {/* Social Media Handles  */}
        <div className="flex text-2xl text-zinc-200 w-56 gap-x-4">
          {info.externalid.imdb_id && (
            <a
              target="_blank"
              href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
            >
              {" "}
              <FaImdb className="hover:text-custompurple duration-100 ml-5  cursor-pointer" />
            </a>
          )}
          {info.externalid.instagram_id && (
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <FaInstagram className="hover:text-custompurple duration-100  text-2xl cursor-pointer" />
            </a>
          )}
          {info.externalid.twitter_id && (
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <FaXTwitter className="hover:text-custompurple duration-100  text-2xl cursor-pointer" />
            </a>
          )}
          {info.externalid.facebook_id && (
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              {" "}
              <FaFacebook className="hover:text-custompurple duration-100  cursor-pointer" />
            </a>
          )}
          {info.externalid.wikidata_id && (
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              {" "}
              <CiGlobe className="hover:text-custompurple duration-100  cursor-pointer" />
            </a>
          )}
        </div>
        <h1 className="text-2xl text-gray-200 font-bold "> Personal Info </h1>
        <h3 className="text-xl text-gray-400 font-semibold">
          {" "}
          Known for -{" "}
          <span className="text-zinc-100">
            {info.detail.known_for_department}
          </span>{" "}
        </h3>
        <h3 className="text-xl text-gray-400 font-semibold">
          {" "}
          Birthday -{" "}
          <span className="text-zinc-100"> {info.detail.birthday} </span>
        </h3>
        <h3 className="text-xl text-gray-400 font-semibold">
          {" "}
          Birth Place -{" "}
          <span className="text-zinc-100">{info.detail.place_of_birth} </span>
        </h3>
        <h3 className="text-xl text-gray-400 font-semibold">
          {" "}
          Gender -{" "}
          <span className="text-zinc-100">{info.detail.gender === 2 ? "Male" : "Female"} </span>
        </h3>
        <h3 className="text-lg text-gray-400 font-semibold">
          {" "}
          Also Known as -{" "}
          <span className="text-zinc-100">
            {info.detail.also_known_as.join(", ")}
          </span>{" "}
        </h3>
      </div>
      <div className="w-[80%] flex flex-col  gap-y-1" >
              <h1 className="text-5xl font-bold mb-1 text-zinc-100" > {info.detail.name} </h1>
              <h3 className="text-xl font-semibold text-zinc-300" >Biography</h3>
              <p className="text-sm text-gray-200" > {info.detail.biography} </p>
              <h3 className="text-2xl font-semibold mt-2 text-zinc-300" >Featured </h3>
              <HorizontalCard trendingdata={info.combinedcredits.cast} />
              <div className="w-full flex justify-between ">
                      <h1 className="text-2xl text-zinc-100 font-semibold" >Acting</h1>
                      <Dropdown func={(e)=> { setcategory(e.target.value) 
                      }} title={"Category"} options={["tv", "movie"]} />
              </div>
              <div className="w-full mt-5 list-disc overflow-x-hidden h-[40vh] overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.5)]" >
                     {info[creditsKey]?.cast.map((card,index)=>(
                  <li className="hover:text-white text-zinc-400 hover:bg-zinc-800 p-5  rounded cursor-pointer" >
                        <Link to={`/${category}/details/${card.id}`} className="" key={index} >
                       <span> {card.orignal_name || card.name || card.title || card.orignal_title} </span>
                     {card.character &&   <span className="block ml-5" > Character name -  {card.character}</span>}
                      </Link>
                  </li>
                     ))}
            
              </div>
        </div>
      </div  >
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetail;
