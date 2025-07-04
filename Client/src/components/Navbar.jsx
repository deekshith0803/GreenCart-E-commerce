import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const { user, setUser, setShowUserLogin, navigate, setSearchQuary, searchQuary, getCartCount, axios } = useAppContext();

    const logout = async () => {
        try {
            const {data} = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate('/');
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleSearch = (query) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
        }
    }

    return (
        <nav className="flex items-center gap-4 justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-300 bg-white relative z-10 h-18">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="h-20 md:h-24 object-contain" src={assets.logo} alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        value={searchQuary}
                        onChange={(e) => setSearchQuary(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e.target.value);
                            }
                        }}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className='w-4 h-4 cursor-pointer'
                        onClick={() => handleSearch(searchQuary)}
                    />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        <img src={assets.profile_icon} className="w-10" alt="profile" />
                        <ul className='absolute top-10 right-0 w-40 bg-white shadow-md rounded-lg hidden group-hover:flex flex-col text-sm'>
                            <li onClick={() => navigate('/my-order')} className='py-2 px-4 hover:bg-gray-100'>My order</li>
                            <li onClick={logout} className='py-2 px-4 hover:bg-gray-100'>Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}


            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>
                <button onClick={() => setOpen(() => open ? setOpen(false) : setOpen(true))} aria-label="Menu" >
                    <img src={assets.menu_icon} alt="Menu" />
                </button>
            </div>

            {open && (
                <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden flex">
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    {user && <NavLink to="/my-order" onClick={() => setOpen(false)}>My Order</NavLink>}
                    <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

                    <div className="w-full mt-2">
                        {!user ? (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setShowUserLogin(true);
                                }}
                                className="w-full px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    logout();
                                }}
                                className="w-full px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}

        </nav>
    )
}

export default Navbar