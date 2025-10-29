import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="bg-white shadow-md fixed w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
                <h1 className="text-2xl font-bold text-indigo-700">
                    CondoShop
                </h1>

                <div className="hidden md:flex space-x-6">
                    <Link to='/' className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                        Home
                    </Link>
                    <Link to='/about' className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                        Sobre o CondoShop
                    </Link>
                    <Link to='/login' className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                        Login                    
                    </Link>
                </div>

                <button
                    className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✖" : "☰"}
                </button>

                <div className={`md:hidden absolute right-4 top-full mt-2 w-40 p-1 bg-white shadow-md rounded-md transform origin-top transition-transform duration-300 ease-out
                    ${isOpen ? "scale-y-100" : "scale-y-0"}`}
                >
                    <Link 
                        to='/' 
                        className="text-gray-700 block py-2 hover:text-indigo-500 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        to='/about' 
                        className="text-gray-700 block py-2 hover:text-indigo-600 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Sobre o CondoShop
                    </Link>
                    <Link 
                        to='/login' 
                        className="text-gray-700 block py-2 hover:text-indigo-600 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    )
}