import React, { useState } from "react";
import useMeasure from "react-use-measure";
import { Link } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import ButtonWrapper from "./ButtonWrapper";


export const Drawer = () => {
    const [open, setOpen] = useState(false);
    const userId = localStorage.getItem('userId');
  
    return (
      <div className="grid place-content-center place-self-auto bg-black">
        <button
          onClick={() => setOpen(true)}
          className=""
        >
          <ButtonWrapper />
        </button>
  
        <DragCloseDrawer open={open} setOpen={setOpen}>
          <div className="mx-auto max-w-2xl space-y-4 text-neutral-400 flex flex-col items-center">
            {userId ? (
                <>
              <h2 className="text-4xl font-bold text-neutral-200 text-center">
                Its not you, its us ...
              </h2>
              <p>
                Server Error
              </p>
              </>
            ) : (
                <>
              <h2 className="text-4xl font-bold text-neutral-200 text-center">
                You forgot to sign in ...
              </h2>
              
              </>
            )}
          </div>
        </DragCloseDrawer>
      </div>
    );
  };
  
const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [contentRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            style={{ y, maxHeight: "80vh", minHeight:'60vh' }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div
              ref={contentRef}
              className="relative z-0  p-4 pt-12"
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};