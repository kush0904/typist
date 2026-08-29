import React, { useState, useEffect, useRef } from 'react';
import Heading from './Heading';
import { motion } from "framer-motion";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { FiHome, FiUsers, FiTerminal, FiPlay, FiBarChart2, FiUser } from "react-icons/fi";
import { DetailedAccounts } from '../DetailedAccount';
import useGameStore from '../../store/useGameStore';
import socket from '../../socketConfig';

const NavItem = ({ to, icon: Icon, label, isActive, onClick }) => (
    <Link to={to} onClick={onClick}>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all ${isActive
                ? 'bg-white/10 text-white shadow-inner border border-white/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon className="text-lg" />
            <span className="text-sm font-semibold hidden lg:block tracking-wide">{label}</span>
        </motion.div>
    </Link>
);

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const dropdownTimeoutRef = useRef(null);
    const { userLoggedIn } = useAuth();
    const userId = localStorage.getItem("userId");
    
    const gameState = useGameStore((state) => state.gameState);
    const setGameState = useGameStore((state) => state.setGameState);

    const handleNavClick = () => {
        if (gameState._id) {
            socket.emit('leave-room', gameState._id);
            setGameState({ _id: "", isOpen: false, players: [], words: [] });
        }
    };

    const handleUserClick = () => {
        setShowDropdown(!showDropdown);
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 30000);
    };

    return (
        <>
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 h-20 text-white z-[100] bg-black/30 backdrop-blur-xl border-b border-white/5 shadow-2xl">

            <div className="flex items-center shrink-0">
                <Link to="/" onClick={handleNavClick}>
                    <motion.div whileHover={{ scale: 1.02 }} className="text-2xl md:text-3xl tracking-widest font-bold">
                        <Heading />
                    </motion.div>
                </Link>
            </div>

            <div className='flex items-center gap-1 md:gap-2'>
                <NavItem to="/" icon={FiHome} label="Home" isActive={location.pathname === '/' || location.pathname === '/home'} onClick={handleNavClick} />
                <NavItem to="/game" icon={FiUsers} label="Multiplayer" isActive={location.pathname.startsWith('/game')} onClick={handleNavClick} />
                <NavItem to="/keys" icon={FiTerminal} label="Practice" isActive={location.pathname === '/keys'} onClick={handleNavClick} />
                <NavItem to="/fallingwords" icon={FiPlay} label="Minigame" isActive={location.pathname === '/fallingwords'} onClick={handleNavClick} />

                {userId && (
                    <NavItem
                        to={`/results/${userId}`}
                        icon={FiBarChart2}
                        label="Stats"
                        isActive={location.pathname === `/results/${userId}`}
                        onClick={handleNavClick}
                    />
                )}

                <div className="relative ml-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUserClick}
                        className={`flex items-center justify-center p-2.5 rounded-full transition-all ${showDropdown || location.pathname === '/detailed'
                            ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] border border-indigo-500'
                            : 'bg-zinc-800/80 text-gray-300 hover:bg-zinc-700 border border-zinc-700/50 hover:text-white'
                            }`}
                    >
                        <FiUser className="text-xl" />
                    </motion.button>

                </div>
            </div>
        </nav>
        {showDropdown && (
            <DetailedAccounts 
                userLoggedIn={userLoggedIn} 
                onClose={() => setShowDropdown(false)} 
            />
        )}
        </>
    );
};

export default NavBar;