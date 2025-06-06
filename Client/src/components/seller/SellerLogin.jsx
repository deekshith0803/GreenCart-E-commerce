import { useEffect, useState } from 'react'
import { useAppContext } from "../../context/AppContext"
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post('/api/seller/login', { email, password });
            console.log(data);
            if (data.success) {
                setIsSeller(true);
                navigate('/seller');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    useEffect(() => {
        if (isSeller) {
            navigate('/seller')
        }
    }, [isSeller])

    return !isSeller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 p-8 py-12 min-w-80 sm:w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium text-center'>
                    <span className='text-primary'>Seller</span> Login
                </p>

                <div className='w-full'>
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        className='border border-gray-300 w-full p-2 mt-1 rounded outline-primary'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder='Enter your password'
                        className='border border-gray-300 w-full p-2 mt-1 rounded outline-primary'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className='bg-primary text-white w-full py-2 rounded-md cursor-pointer hover:bg-primary-dark'
                >
                    Login
                </button>
            </div>
        </form>
    )
}

export default SellerLogin 