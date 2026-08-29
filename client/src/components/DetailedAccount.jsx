import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import useGameStore from "../store/useGameStore";
import socket from "../socketConfig";

export const DetailedAccounts = ({ userLoggedIn, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);

  const handleNavigate = () => {
    if (gameState._id) {
      socket.emit('leave-room', gameState._id);
      setGameState({ _id: "", isOpen: false, players: [], words: [] });
    }
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleSignOut = () => {
    doSignOut().then(() => {
      navigate('/home');
      handleNavigate();
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="bg-neutral-950 p-4 md:p-8 fixed top-0 left-0 w-screen h-screen z-[999]">
      <button
        onClick={() => { setIsVisible(false); if (onClose) onClose(); }}
        className="absolute top-10 right-10 bg-neutral-800 text-neutral-50 p-3 rounded-full hover:bg-neutral-700 transition-colors z-[1000]"
      >
        <FiX size={24} />
      </button>
      <div className="mx-auto max-w-4xl">
        {userLoggedIn ? (
          <Links
            heading="Log-Out"
            subheading="Log out of your account"
            imgSrc="/register.png"
            handleClick={handleSignOut}
          />
        ) : (
          <Link to="/login" onClick={handleNavigate}>
            <Links
              heading="Log-In"
              subheading="Log in or create your account"
              imgSrc="/loginImage.png"
            />
          </Link>
        )}
        <Link to="/home" onClick={handleNavigate}>
          <Links
            heading="Home"
            subheading="Back to home"
            imgSrc="/home.png"
          />
        </Link>
        <Link to="/fallingwords" onClick={handleNavigate}>
          <Links
            heading="Falling-Words"
            subheading="Catch the falling words"
            imgSrc="/fallingWords.png"
          />
        </Link>

        <Link to="/game" onClick={handleNavigate}>
          <Links
            heading="Multiplayer"
            subheading="Play with your friends"
            imgSrc="/game.png"
          />
        </Link>
        <Link to="/about" onClick={handleNavigate}>
          <Links
            heading="About-Us"
            subheading="More about us"
            imgSrc="/about-section.jpg"
          />
        </Link>
      </div>
    </section>
  );
};

const Links = ({ heading, imgSrc, subheading, handleClick }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-5 cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-50 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-4xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>
      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />
      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};
