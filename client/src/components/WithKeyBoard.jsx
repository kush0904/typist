import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar/Navbar";
import Loader from "./Loader";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import MainPage from "./MainPage";
import MainPageForKeys from "./MainPageForKeys";

const COLORS_TOP = ["#1E67C6", "#CE84CF", "#a31a3b","#13FFAA"];

const WithKeyBoard = () => {
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
    className="relative  min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200">

        <motion.section>
            <motion.div className="fixed top-0 left-0 w-full z-50">
                <NavBar />
            </motion.div>

            <div className="relative z-10 w-full">
                <MainPageForKeys />
            </div>

        </motion.section>

        <div className="absolute inset-0 z-0">
            <Canvas>
                <Stars radius={50} count={2500} factor={5} fade speed={2} />
            </Canvas>
        </div>
    </motion.section>
            )}
    </>
  );
};

export default WithKeyBoard;
