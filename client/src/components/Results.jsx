import './Results.css';
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { formatPercentage } from "../utils/helpers";
import { DurationContext } from "./DurationContext";

const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  className = "",
}) => {
  const [showPrompt, setShowPrompt] = useState(true);

  if (state !== "finish") {
    return null;
  }

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  const { duration } = useContext(DurationContext);
  let cpm = 0;

  const userId = localStorage.getItem("userId");

  if (duration === 15) {
    cpm = (total - errors) * 4;
  } else if (duration === 30) {
    cpm = (total - errors) * 2;
  } else {
    cpm = total - errors;
  }

  const wpm = Math.round(cpm / 5);

  return (
    <motion.div
      initial={initial}
      animate={animate}
      className={`flex flex-col items-center text-white space-y-3 ${className}`}
    >
      <motion.div
        initial={initial}
        animate={animate}
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
          delay: 0.5
        }}
        className="glow"
      >
        Accuracy:
        <span>{formatPercentage(accuracyPercentage)}</span>
      </motion.div>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
          delay: 1
        }}
        className="glow"
      >
        Errors:
        <span>{errors}</span>
      </motion.div>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
          delay: 1.5
        }}
        className="glow"
      >
        Typed:
        <span>{total}</span>
      </motion.div>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
          delay: 2
        }}
        className="glow"
      >
        WPM:
        <span>{wpm}</span>
      </motion.div>

      {userId ? (
        <motion.div
          initial={initial}
          animate={animate}
          transition={{
            ease: "linear",
            duration: 2,
            x: { duration: 1 },
            delay: 2.5
          }}
          className="text-sm text-center glow"
        >
          <Link to={`/results/${userId}`} className="hover:underline font-bold text-indigo-400">
            View Performance Dashboard &rarr;
          </Link>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={initial}
            animate={animate}
            transition={{ ease: "linear", duration: 2, x: { duration: 1 }, delay: 2.5 }}
            className="text-sm text-center opacity-50 glow mb-4"
          >
            Login to view detailed results
          </motion.div>

          {/* Non-blocking Guest Login Bar */}
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, type: "spring", stiffness: 200, damping: 20 }}
              className="mt-6 flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/50 border border-zinc-700/50 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg"
            >
              <div className="text-left">
                <h4 className="text-white font-semibold text-sm">Don't lose your {wpm} WPM!</h4>
                <p className="text-zinc-400 text-xs mt-0.5">Track your progress on the global leaderboard.</p>
              </div>
              
              <div className="flex items-center gap-2 sm:ml-4">
                <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                  Free Login
                </Link>
                <button 
                  onClick={() => setShowPrompt(false)}
                  className="bg-transparent hover:bg-white/10 text-zinc-400 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Results;
