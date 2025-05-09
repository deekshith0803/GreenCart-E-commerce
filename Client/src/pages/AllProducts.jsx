import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const { products, searchQuary } = useAppContext(); // Fixed typo in variable name
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const searchTerm = searchQuary?.trim().toLowerCase() || '';

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            return matchesSearch && product.inStock;
        });

        setFilteredProducts(filtered);
    }, [products, searchQuary]);

    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All Products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product._id} 
                        product={product}
                    />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="w-full text-center py-12 text-gray-500">
                    No products found matching your search
                </div>
            )}
        </div>
    )
}

export default AllProducts