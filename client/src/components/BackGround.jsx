import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import NavBar from "./NavBar/Navbar";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import MainPage from "./MainPage";

const COLORS_TOP = ["#1E67C6", "#CE84CF", "#DD335C","#13FFAA"];

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

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section style={{
      backgroundImage,
    }}
    className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200">

        <motion.section>
            <motion.div className="fixed top-0 left-0 w-full z-50">
                <NavBar />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center ">
                <MainPage />
            </div>

        </motion.section>

        <div className="absolute inset-0 z-0">
            <Canvas>
                <Stars radius={50} count={2500} factor={5} fade speed={2} />
            </Canvas>
        </div>
    </motion.section>
  );
};

export default BackGround;
