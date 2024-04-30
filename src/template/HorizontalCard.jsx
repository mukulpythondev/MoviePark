import React from 'react'
import { Link } from 'react-router-dom'

const HorizontalCard = ({trendingdata}) => {
  return (
    <div className='w-full  p-5 ' >
        <div className='w-[100%] h-[49vh] mb-2 py-5 flex rounded-lg   overflow-y-hidden  '>
             {trendingdata.map((card,index) => <div key={index} className=' flex gap-1 flex-col hover:scale-105  duration-150 min-w-[18%] mr-5 bg-zinc-900 '  >
                <img className=' min-h-[55%] object-cover  object-center ' src={`https://image.tmdb.org/t/p/original${card.backdrop_path || card.poster_path}`} alt="" />
                 <div className='p-1 h-[45%]' >
                 <h1 className='text-custompurple text-lg  font-semibold uppercase'>{ card.title || card.name || card.original_name || card.original_title }</h1>
                   <p className='font-sm text-zinc-200 ' > {card.overview.slice(0,70)}...<Link className='text-gray-500' >more</Link> </p>
                 </div>
             </div> )}
        </div>
    </div>
  )
}

export default HorizontalCard