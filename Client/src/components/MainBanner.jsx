import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative w-full'>
      {/* Background Images */}
      <img src={assets.main_banner_bg} alt="banner" className='hidden md:block w-full h-auto object-cover' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='block md:hidden w-full h-auto object-cover' />

      {/* Text and Buttons */}
      <div className='absolute inset-0 flex flex-col justify-end md:justify-center items-center md:items-start px-4 md:px-16 lg:px-20 xl:px-28 pb-24 md:pb-0 z-10'>

        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-snug text-center md:text-left text-black max-w-[90%] md:max-w-[550px]'>
          Freshness You Can Trust, Savings You Will Love
        </h1>

        <div className='flex flex-col sm:flex-row gap-4 mt-6 font-medium'>
          {/* Primary Button - always visible */}
          <Link 
            to={"/products"} 
            className='group flex items-center gap-2 px-6 md:px-8 py-3 bg-primary hover:bg-primary-dull text-white transition rounded-full cursor-pointer'
          >
            Shop now
            <img 
              className='md:hidden transition group-focus:translate-x-2' 
              src={assets.white_arrow_icon} 
              alt="arrow" 
            />
          </Link>

          {/* Secondary Button - hidden on small screens, visible from md and up */}
          <Link 
            to={"/products"} 
            className='group hidden md:flex items-center gap-2 px-8 py-3 cursor-pointer text-black'
          >
            Explore Deals
            <img 
              className='transition group-hover:translate-x-2' 
              src={assets.black_arrow_icon} 
              alt="arrow" 
            />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default MainBanner
