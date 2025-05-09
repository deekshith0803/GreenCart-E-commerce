import React from 'react';
import { assets, categories } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className='mt-16 px-4 md:px-8'>
      <p className='text-2xl md:text-3xl font-semibold mb-6'>Categories</p>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-6'>
        {categories.map((category, index) => (
          <div
            key={index}
            className='group cursor-pointer py-6 px-4 rounded-xl flex flex-col items-center justify-center transition-transform hover:scale-110 shadow-md'
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className='max-w-24 mb-3 transition-transform duration-300 ease-in-out group-hover:scale-110'
            />
            <p className='text-sm font-medium text-center'>{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
