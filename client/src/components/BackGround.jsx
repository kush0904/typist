import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/Navbar";
import Loader from "./Loader";
import { FiChevronDown } from "react-icons/fi";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import MainPage from "./MainPage";

const COLORS_TOP = ["#1E67C6", "#CE84CF", "#a31a3b", "#13FFAA"];

const BackGround = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const [showLoader, setShowLoader] = useState(true);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;


  useEffect(() => {
    setShowLoader(false);
  }, []);

  return (

    <>
      {showLoader ? (
        <Loader />
      ) : (
        <motion.section style={{
          backgroundImage,
        }}
          className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200">

          <motion.section>
            <div className="relative z-10 flex flex-col items-center ">
              <MainPage />
            </div>

          </motion.section>

          <div className="absolute inset-0 z-0">
            <Canvas>
              <Stars radius={50} count={2500} factor={5} fade speed={2} />
            </Canvas>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-xs tracking-widest text-gray-400 mb-2 font-mono uppercase">There is more</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <FiChevronDown className="text-3xl text-white/50" />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </>
  );
};

export default BackGround;
