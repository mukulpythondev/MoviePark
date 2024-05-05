import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'

const App = () => {
  return (
    <div className='h-screen w-screen flex bg-customblack' >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/trending' element={<Trending/>} />
      </Routes>
    </div>
  )
}

export default App