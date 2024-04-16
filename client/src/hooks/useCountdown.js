import { useCallback, useEffect, useRef, useState } from "react";

const useCountdown = (initialSeconds) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef(null);
  const hasTimerEnded = timeLeft <= 0;
  const isRunning = intervalRef.current != null;

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [setTimeLeft, hasTimerEnded, isRunning]);

  const resetCountdown = useCallback((seconds) => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(seconds);
  }, []);

  useEffect(() => {
    resetCountdown(initialSeconds);
  }, [initialSeconds, resetCountdown]);

  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [hasTimerEnded]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdown;
