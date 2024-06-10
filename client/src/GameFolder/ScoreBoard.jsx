import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const getScoreBoard = (players) => {
    const scoreBoard = players.filter(player => player.WPM !== -1);
    return scoreBoard.sort((a, b) => b.WPM - a.WPM);
}



const ScoreBoard = ({ players }) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(true);
    const scoreBoard = getScoreBoard(players);

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleNavigation = () => {
        setIsOpen(false);
        navigate('/game');
    }

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
                        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: "12.5deg" }}
                            animate={{ scale: 1, rotate: "0deg" }}
                            exit={{ scale: 0, rotate: "0deg" }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-indigo-800 to-purple-900 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                        >
                            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
                            <div className="relative z-10">
                                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                                    <FiAlertCircle />
                                </div>
                                <h3 className="text-3xl font-bold text-center mb-2">
                                    Scoreboard
                                </h3>
                                <div className="text-white text-center mb-6">
                                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="py-2 px-4">Player</th>
                                            <th className="py-2 px-4">WPM</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {scoreBoard.map((player, index) => (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="py-2 px-4">{player.nickName}</td>
                                                <td className="py-2 px-4">{player.WPM}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                        </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={closeModal} 
                                        className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                                    >
                                        Go back
                                    </button>
                                    <button
                                        onClick={handleNavigation}
                                        className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                                    >
                                        New game!
                                    </button>
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
