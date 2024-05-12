import React, { useState, useEffect } from 'react';
import { faker } from "@faker-js/faker";
import { FaHome, FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StarsCanvas from './StarCanvas';
import { Center } from '@react-three/drei';
import {motion} from 'framer-motion'


const FallingWords = () => {
  const [words, setWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  

  useEffect(() => {
    let lastTime = performance.now();
    const animationLoop = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          y: word.y + (deltaTime / 100),
        }))
      );

      if (!gameOver) {
        requestAnimationFrame(animationLoop);
      }
    };

    requestAnimationFrame(animationLoop);

    return () => cancelAnimationFrame(animationLoop);
  }, [gameOver]);

  useEffect(() => {
    if (words.length > 0 && words[0].y >= window.innerHeight - 50) {
      setGameOver(true);
    }
  }, [words]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const typedWord = event.target.value.trim();
      const matchedWordIndex = words.findIndex((word) => word.text === typedWord);
      if (matchedWordIndex !== -1) {
        setScore(score + 1);
        setWords((prevWords) => prevWords.filter((_, index) => index !== matchedWordIndex));
      }
      event.target.value = '';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setWords((prevWords) => [
          ...prevWords,
          {
            text: faker.random.word(10),
            x: Math.floor(Math.random() * (window.innerWidth - 150)),
            y: -50,
          },
        ]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [gameOver]);

  const handlePlayAgain = () => {
    setGameOver(false);
    setWords([]);
    setScore(0);
    setInputFocused(false);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {gameOver ? (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            <StarsCanvas />
          </div>

          <div className="w-full h-full absolute">
            <div className="w-full h-full opacity-35 absolute flex items-center justify-center">
              <video
                className="w-full h-auto"
                preload="false"
                playsInline
                loop
                muted
                autoPlay
                src="/public_cards-video.webm"
              />
            </div>
          </div>
        
          <div className="flex flex-col justify-center items-center h-screen z-10">
            <h1>
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                GAME OVER
              </span>
            </h1>

            <motion.div className='cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center font-extrabold'>
              Score: {score}
            </motion.div>

            <button onClick={handlePlayAgain} className="text-white w-full shadow-[0px_7px_25px_4px_#553c9a] font-bold py-2 px-4 rounded hover:shadow-[0px_0px_13px_10px_#e2e8f0] bg-black">
              Play Again
            </button>

            <Link to="/" className='text-white w-full mt-4 font-bold py-2 px-4 rounded shadow-[0px_7px_25px_4px_#553c9a] bg-black text-center hover:shadow-[0px_0px_13px_10px_#e2e8f0]'>
              Home
            </Link>
          </div>



        </>
      ) : (
        <>

        <div className="w-[30%] flex flex-row items-center justify-between absolute top-0 mt-4 z-[2]">
          <div className="flex items-center justify-between w-full h-auto border-2 border-[#835bfa61] bg-[#03001477] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200 hover:bg-black shadow-[0px_7px_25px_4px_#553c9a] hover:shadow-[0px_0px_13px_10px_#e2e8f0]">
          <Link to="/">
              Home
            </Link>

            <div className='font-extrabold'>
            {score}
            </div>

            <button onClick={handlePlayAgain}>
              Retry
            </button>
          </div>
        </div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <StarsCanvas />
          </div>

          <div className="w-full h-full absolute">
            <div className="w-full h-full opacity-35 absolute flex items-center justify-center">
              <video
                className="w-full h-auto"
                preload="false"
                playsInline
                loop
                muted
                autoPlay
                src="/public_cards-video.webm"
              />
            </div>
          </div>

          <div className='shadow-[0px_-9px_31px_4px_#553c9a]' style={{ position: 'absolute', bottom: '2px', width: '100%', zIndex: 2 }}>
            <input
              type="text"
              placeholder={inputFocused ? '' : "Type the falling words here"}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{
                fontSize: '24px',
                padding: '10px',
                width: '100%',
                textAlign: 'center',
                backgroundColor: 'black',
                zIndex: 2,
                color: 'white',
                outline: 'none',
              }}
            />
          </div>
          {words.map((word, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: word.x,
                top: Math.min(word.y, window.innerHeight - 50),
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {word.text}
            </div>
          ))}

        </>
      )}
    </div>
  );
};

export default FallingWords;