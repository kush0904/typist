import React from "react";
import { Link } from "react-router-dom";
import AuroraBackground from "../components/ui/aurora-background";
import { motion } from "framer-motion";

const About = () => {
    return (
        <AuroraBackground>
            <Link to="/" className="absolute top-8 left-8 z-50">
                <button className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-fit px-4 py-2 rounded-full border border-zinc-500">
                    &larr; Back to Home
                </button>
            </Link>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4 max-w-4xl text-center"
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-white mb-6">
                    About Typista
                </div>
                <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 text-zinc-300">
                    Typista is an elegant, high-performance typing game designed to help you practice and perfect your typing speed and accuracy. 
                </div>
                <div className="font-extralight text-sm md:text-xl dark:text-neutral-200 text-zinc-400">
                    Whether you prefer practicing alone with randomized paragraphs or challenging your friends in our real-time multiplayer racing mode, Typista provides a seamless, distraction-free environment. Race against time, track your WPM, and improve your skills with every keystroke!
                </div>
            </motion.div>
        </AuroraBackground>
    );
}

export default About;
