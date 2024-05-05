import React from 'react'
import Loaderimage from "../../public/loader.gif"
 const Loader = () => {
  return (
    <div className=' bg-black h-screen w-full flex items-center justify-center' >
    <img  className='h-3/5 ' src={Loaderimage} alt="" />
  </div>
  )
}
export default Loader;
