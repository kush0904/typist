import { useRef } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { useEffect } from "react";

import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const RestartButton = ({
  onRestart: handleRestart,
  className = "",
}) => {
  const buttonRef = useRef(null);


  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  

  



  const COLORS_TOP = ["#1E67C6", "#CE84CF", "#DD335C","#13FFAA"];

  const color = useMotionValue(COLORS_TOP[0]);


  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (

    <motion.button
          style={{
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 mt-2"
        
          onClick={handleClick}
        >
          
          <VscDebugRestart className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" ref={buttonRef}/>
        </motion.button>
   
  );
};

export default RestartButton;
