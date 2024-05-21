import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TV from './components/TV'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetail from './components/PersonDetail'
import Trailer from './components/Trailer'

const App = () => {
  return (
    <div className='h-screen w-screen  flex bg-customblack' >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/trending' element={<Trending/>} />
        <Route path='/popular' element={<Popular/>} />
        <Route path='/movie' element={<Movie/>} />
        <Route path='/movie/details/:id' element={<MovieDetails/>}  >
        <Route path='/movie/details/:id/trailer' element={<Trailer/>}  />
        </Route>
        <Route path='/tv' element={<TV/>} />
        <Route path='/tv/details/:id' element={<TvDetails/>}  />
        
        <Route path='/person' element={<People/>} />
        <Route path='/person/details/:id' element={<PersonDetail/>}  /> 
      
      </Routes>
    </div>
  )
}

export default App