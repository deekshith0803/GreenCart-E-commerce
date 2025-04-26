import React from 'react'
import { assets, categories } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Categories = () => {

  const navigate = useNavigate();

  return (
    <div className='mt-15'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:gap-6 kl:gap-7 mt-6 gap-6'>

        {categories.map((category, index) => (<div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col items-center justify-center'
          style={{ backgroundColor: category.bgColor }}
          onClick={() => {
            navigate(`/products/${category.path.toLowerCase()}`);
            scrollTo(0, 0);
          }}
        >
          <img src={category.image} alt={category.text} className='group hower:scale-110 transition max-w-28' />
          <p className='text-sm font-medium'>{category.text}</p>
        </div>
        ))}

      </div>
    </div>
  )
}

export default Categories
