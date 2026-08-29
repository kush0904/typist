import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';
import socket from '../socketConfig';

const getScoreBoard = (players) => {
    const scoreBoard = players.filter(player => player.WPM !== -1);
    return scoreBoard.sort((a, b) => b.WPM - a.WPM);
}

const ScoreBoard = ({ players }) => {

    const navigate = useNavigate();
    const setGameState = useGameStore((state) => state.setGameState);

    const [isOpen, setIsOpen] = useState(true);
    const scoreBoard = getScoreBoard(players);

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleNavigation = () => {
        setIsOpen(false);
        socket.emit('restart-game', window.location.pathname.split('/').pop());
    }

    const currentPlayer = players.find(p => p.socketID === socket.id);
    const isPartyLeader = currentPlayer?.isPartyLeader;

    if (scoreBoard.length === 0) {
        return null;
    } else {
        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="bg-slate-900/40 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: "12.5deg" }}
                            animate={{ scale: 1, rotate: "0deg" }}
                            exit={{ scale: 0, rotate: "0deg" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-gray-200 p-8 rounded-2xl w-full max-w-lg shadow-2xl cursor-default relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-center mb-6 text-white tracking-wider">
                                    Scoreboard
                                </h3>
                                <div className="text-white text-center mb-6">
                                <table className="min-w-full bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700">
                                    <thead className="bg-gray-900/80 text-gray-300">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold tracking-wider text-left">Player</th>
                                            <th className="py-3 px-4 font-semibold tracking-wider text-right">WPM</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300">
                                        {scoreBoard.map((player, index) => (
                                            <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors">
                                                <td className="py-3 px-4 text-left font-medium">{player.nickName}</td>
                                                <td className="py-3 px-4 text-right font-mono font-bold text-indigo-400">{player.WPM}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                        </div>
                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={closeModal} 
                                        className="bg-transparent hover:bg-white/10 border border-gray-600 transition-colors text-gray-300 font-semibold w-full py-3 rounded-full"
                                    >
                                        {isPartyLeader ? "Go back" : "Stay in room"}
                                    </button>
                                    {isPartyLeader ? (
                                        <button
                                            onClick={handleNavigation}
                                            className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold w-full py-3 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                                        >
                                            New game!
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                socket.emit('leave-room', window.location.pathname.split('/').pop());
                                                setGameState({ _id: "", isOpen: false, players: [], words: [] });
                                                navigate('/');
                                            }}
                                            className="bg-red-600 hover:bg-red-500 transition-colors text-white font-semibold w-full py-3 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                                        >
                                            Leave room
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                        
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
}

export default ScoreBoard;
