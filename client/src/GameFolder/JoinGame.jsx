import React, { useState } from 'react';
import socket from '../socketConfig';
import AuroraBackground from "../components/ui/aurora-background";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


const JoinGame = () => {
    const [userInput, setUserInput] = useState({ gameID: null, nickName: null });

    const onChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }

    const border = "1px solid white";
    const boxShadow = "0px 4px 24px black";
    
    const submitButton = (e) => {
        e.preventDefault();
        console.log(userInput);
        socket.emit('join-game', userInput);
    };
    
    return (
        <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center text-white">
                    Join an Existing Room
                </div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-zinc-400">
                    Connect with your Friends
                </div>

                <motion.input
                    type="text"
                    name="gameID" placeholder="Enter Game ID" value={userInput.gameID || ''} onChange={onChange}

                    style={{
                        border,
                        boxShadow,
                    }}
                    whileHover={{
                        scale: 1.015,
                    }}
                    whileTap={{
                        scale: 0.985,
                    }}
                    className="group relative flex w-fit items-center gap-1.5 bg-gray-950/10 px-4 py-2 text-gray-50 hover:bg-gray-950/50"
                />


                <motion.input
                    type="text"
                    name="nickName" placeholder="Enter Nickname" value={userInput.nickName || ''} onChange={onChange} 

                    style={{
                        border,
                        boxShadow,
                    }}
                    whileHover={{
                        scale: 1.015,
                    }}
                    whileTap={{
                        scale: 0.985,
                    }}
                    className="group relative flex w-fit items-center gap-1.5 bg-gray-950/10 px-4 py-2 text-gray-50 hover:bg-gray-950/50"
                />

                <button  onClick={submitButton} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 hover:shadow-[0px_0px_13px_2px_#e2e8f0]" >Join Room</button>

        
            </motion.div>





            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 px-4 text-center"
                >
                    <div className="font-extralight text-base dark:text-neutral-200 py-4 text-zinc-400">
                        Want to create a room?
                        <Link to = "/game">
                        <button className="dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 ">Create Room</button>
                        </Link>
                    </div>
                    
                </motion.div>
            </div>



            
        </AuroraBackground>
    );
}

/*
     <h1>Join Game</h1>
            <input type="text" name="gameID" placeholder="Enter Game ID" value={userInput.gameID || ''} onChange={onChange} />
            <input type="text" name="nickName" placeholder="Enter Nickname" value={userInput.nickName || ''} onChange={onChange} />
            <button onClick={submitButton}>Join Game</button>
*/

export default JoinGame;
