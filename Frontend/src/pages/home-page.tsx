import { Link } from "react-router-dom";

export function Home() {
    return(
        <div className="">
            <h1 className="flex justify-center items-center text-pink-300 lg:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold md:py-6 md:px-20 py-1.5 px-8">
                Home
            </h1>
            <div className="h-px bg-pink-100"></div>

            <div className="flex md:py-6 md:px-20 py-3 px-8 text-pink-200 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px] gap-3">
                <Link to="/register" className="bg-yellow-500 rounded-lg p-3 hover:bg-yellow-600 text-blue-600">Register</Link>
                <Link to="/login" className="bg-green-500 rounded-lg p-3 hover:bg-green-600 text-blue-600">Login</Link>
            </div>
        </div>      
    )
}