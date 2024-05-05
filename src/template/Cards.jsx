import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({cardData}) => {
  return (
    <div className='flex px-20 w-full rounded-md  bg-customblack  gap-16 flex-wrap ' >
        {cardData.map((card,index)=> <Link key={index} className='h-[45vh] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  hover:scale-105 duration-150 w-[15%] ' >
                     <img className='h-[70%] w-full rounded-md object-cover' src={`https://image.tmdb.org/t/p/original${ card.poster_path || card.backdrop_path }`} alt="" />
                     <h1 className='text-zinc-300 mt-1 p-2 text-lg  font-semibold uppercase'>{ card.title || card.name || card.original_name || card.original_title }</h1>
        </Link> )}
    </div>
  )
}

export default Cards