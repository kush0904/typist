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

  console.log(duration);

  if (duration === 15) {
    cpm = (total - errors) * 4;
  } else if (duration === 30) {
    cpm = (total - errors) * 2;
  } else {
    cpm = total - errors;
  }

  return (
    <motion.ul
      initial={initial}
      animate={animate}
      className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.4 }}
      >
        Typed: {total}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ duration: 0.3, delay: 1.8 }}
      >
        CPM: {cpm}
      </motion.li>

      {userId ? (
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ duration: 0.3, delay: 1.8 }}
        >
          <div className="text-sm text-center text-white">
            Show Detailed Results: {"   "}
            <Link to={`/results/${userId}`} className="text-center text-sm hover:underline font-bold">
              Continue
            </Link>
          </div>
        </motion.li>
      ) : (
        <motion.li
          initial={initial}
          animate={animate}
          transition={{ duration: 0.3, delay: 1.8 }}
        >
          <div className="text-sm text-center text-white opacity-50">
            Show Detailed Results: {"   "}
            <span className="text-center text-sm font-bold">Continue</span>
          </div>
        </motion.li>
      )}
    </motion.ul>
  );
};

export default Results;
