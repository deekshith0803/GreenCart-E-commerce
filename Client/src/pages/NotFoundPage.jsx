import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div class="flex flex-col items-center justify-center text-sm pt-15 max-md:px-4">
            <h1 class="text-8xl md:text-9xl font-bold text-primary">404</h1>
            <div class="h-1 w-16 rounded bg-primary my-5 md:my-7"></div>
            <p class="text-2xl md:text-3xl font-bold text-primary">Page Not Found</p>
            <p class="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <div class="flex items-center gap-4 mt-6">
                <Link to="/" class="bg-primary px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
                    Return Home
                </Link>
                <Link to="#" class="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md active:scale-95 transition-all">
                    Contact support
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
