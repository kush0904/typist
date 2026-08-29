import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DisplayCode = ({ gameID }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const textInput = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameID);
    setCopySuccess('Code Copied!');
    setTimeout(() => {
      setCopySuccess('');
    }, 3000);
  };

  const copyLink = () => {
    const link = `${window.location.origin}/game/join?code=${gameID}`;
    navigator.clipboard.writeText(link);
    setCopySuccess('Link Copied!');
    setTimeout(() => {
      setCopySuccess('');
    }, 3000);
  };

  return (
    <div className="fixed bottom-8 left-0 w-full flex justify-center z-50 px-4 pointer-events-none">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-auto bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 p-6 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] w-full max-w-lg flex flex-col items-center relative overflow-hidden"
      >
        <h2 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-5">
          Invite Friends
        </h2>
        
        <div className="flex w-full items-center gap-3 bg-black/50 p-2 rounded-2xl border border-gray-800 shadow-inner">
          <input
            type="text"
            value={gameID}
            ref={textInput}
            readOnly
            className="flex-grow bg-transparent text-center font-mono text-2xl tracking-widest text-white font-bold outline-none cursor-default min-w-0"
          />
          <div className="flex gap-2 shrink-0">
            <button
              onClick={copyToClipboard}
              className="bg-zinc-800 hover:bg-zinc-700 transition-colors text-white text-sm font-semibold py-3 px-5 rounded-xl whitespace-nowrap active:scale-95"
            >
              Code
            </button>
            <button
              onClick={copyLink}
              className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-semibold py-3 px-5 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] whitespace-nowrap active:scale-95"
            >
              Link
            </button>
          </div>
        </div>

        <AnimatePresence>
          {copySuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-5 right-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
            >
              {copySuccess}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DisplayCode;
