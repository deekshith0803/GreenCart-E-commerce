import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, updateCartItems, cartItems, navigate } = useAppContext();

    return product && (
        <div onClick={() => {
            navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
            scrollTo(0, 0);
        }} className="border border-gray-500/20 rounded-md p-3 bg-white w-full max-w-xs md:max-w-sm lg:max-w-md">
            <div className="group cursor-pointer flex justify-center px-2">
                <img className="group-hover:scale-105 transition transform max-w-full md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-1 mt-1">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className='w-4' src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" />
                    ))}
                    <p>({4})</p>
                </div>
                <div className="flex items-end justify-between mt-4">
                    <p className="text-primary text-xl font-medium">
                        {currency}{product.offerPrice}{" "}
                        <span className="text-gray-500/60 text-sm line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e) => { e.stopPropagation() }} className="text-primary">
                        {!cartItems[product._id] ? (
                            <button
                                className="flex items-center justify-center gap-2 bg-primary/10 border border-primary/40 w-[64px] h-[34px] rounded cursor-pointer text-sm px-2 py-1"
                                onClick={() => addToCart(product._id)}>
                                <img className="w-4" src={assets.cart_icon} alt="cart" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 w-full max-w-[120px] h-[34px] bg-primary/25 rounded">
                                <button
                                    // onClick={() => { setCount(() => { removeFromCart(product._id) }) }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(product._id);
                                    }}
                                    className="cursor-pointer text-md px-2 h-full">
                                    -
                                </button>
                                <span className="w-6 text-center">{cartItems[product._id]}</span>
                                <button
                                    onClick={() => { addToCart(product._id) }}
                                    className="cursor-pointer text-md px-2 h-full">
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
