import React, { useState, useEffect, useRef } from 'react';
import Heading from './Heading';
import { ImStatsBars } from "react-icons/im";
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth'
import { IoGameControllerSharp } from "react-icons/io5";
import { FaRegKeyboard } from "react-icons/fa";
import { IoFootballSharp } from "react-icons/io5";



const NavBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
    const [showDropdown, setShowDropdown] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userId"));
    const location = useLocation();
    const dropdownTimeoutRef = useRef(null);

    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const handleClick = () => {
        setIsActive(true);
    };

    useEffect(() => {
        setIsActive(location.pathname === `/results/${localStorage.getItem("userId")}`);
    }, [location]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleUserClick = () => {
        setShowDropdown(!showDropdown);
        setIsLoggedIn(!!localStorage.getItem("userId"));

        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 10000);
    };

    const handleDropdownClose = () => {
        setShowDropdown(false);
        clearTimeout(dropdownTimeoutRef.current);
    };



    return (
        <nav className="w-full flex justify-between items-center mx-auto px-8 h-20 text-white top-0 left-0">
            <div className="flex items-center">
                <a className="_o6689fn" href="/">
                    <div className="md:block text-3xl">
                        <Heading />
                    </div>
                </a>
            </div>



            

            <div className='flex items-center'>


            <Link to="/game" className='mr-2'>
            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.985 }}
                                    className="group relative flex w-fit items-center"
                                >
                                <IoFootballSharp  className="transition-transform group-hover:scale-x-20 text-2xl group-active:scale-x-40 ml-2" />
                                </motion.button>
                            </div>
            </Link>


            <Link to="/keys" className='mr-2'>
            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.985 }}
                                    className="group relative flex w-fit items-center"
                                >
                                <FaRegKeyboard className="transition-transform group-hover:scale-x-20 text-2xl group-active:scale-x-40 ml-2" />
                                </motion.button>
                            </div>
            </Link>

            <Link to="/fallingwords" className='mr-2'>
            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.985 }}
                                    className="group relative flex w-fit items-center"
                                >
                                <IoGameControllerSharp  className="transition-transform group-hover:scale-x-20 text-2xl group-active:scale-x-40 ml-2" />
                                </motion.button>
                            </div>
            </Link>

            <Link to={`/results/${localStorage.getItem("userId")}`} onClick={handleClick}>
                <div className="block relative mr-3 ">
                    <button type="button" className={`inline-block px-1 py-1 rounded-full relative ${isActive ? 'bg-white text-black' : ''}`}>
                        <div className="flex items-center">
                            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.985 }}
                                    className="group relative flex w-fit items-center"
                                >
                                    Stats
                                    <ImStatsBars className="transition-transform group-hover:scale-x-20 group-active:scale-x-40 ml-2" />
                                </motion.button>
                            </div>
                        </div>
                    </button>
                </div>
            </Link>

            <div className="flex items-center">
                <div
                    className="relative group"
                    onClick={handleUserClick}
                >
                    <button type="button" className="inline-block px-1 py-1 rounded-full relative">
                    {userLoggedIn ? (
                      <div className="flex items-center">
                            <FaUser />
                        </div>) :
                        
                        <div className="flex items-center">Account</div>
                    }
                    </button>
                    {showDropdown && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10"
                        >
                            <div className="py-1">
                                {userLoggedIn ? (
                                  <>
                                    <button onClick={() => { doSignOut().then(() => { navigate('/home') }) }} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                    </>
                                ) : (
                                    <>
                                    <Link className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={'/login'}>Login</Link>
                                    <Link className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={'/register'}>Register</Link>
                                    </>
                                )}
                            </div>
                            <button onClick={handleDropdownClose} className="block w-full text-center px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-900">Close</button>
                        </motion.div>
                    )}
                </div>
            </div>
            </div>
        </nav>
    );
};

export default NavBar;
