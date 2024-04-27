import './Results.css';
import { motion } from "framer-motion";
import { useContext } from "react";
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
        CPM:
        <span>{cpm}</span>
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
          <Link to={`/results/${userId}`} className="hover:underline font-bold">
            Show Detailed Results
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={initial}
          animate={animate}
          transition={{
            ease: "linear",
            duration: 2,
            x: { duration: 1 },
            delay: 2.5
          }}
          className="text-sm text-center opacity-50 glow"
        >
          Show Detailed Results
        </motion.div>
      )}
    </motion.div>
  );
};

export default Results;
