import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {
    const { navigate } = useAppContext();
    let {search} = useLocation();
    const quart = new URLSearchParams(search)
    const nextUrl = quart.get('next');

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            }, 5000)
        }
    }, [nextUrl])
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900 border-t-primary'></div>
        </div>
    )
}

export default Loading
