import { useCallback, useEffect, useState, useContext } from "react";
import { countErrors, debug } from "../utils/helpers";
import useTypings from "./useTypings";
import useWords from "./useWords";
import useCountdown from "./useCountdown";
import { DurationContext } from "../components/DurationContext";
import { ModeContext } from "../components/ModeContext";
import axios from "axios";

const NUMBER_OF_WORDS = 10;


const useEngine = () => {

  const userId = localStorage.getItem('userId');

  const { duration } = useContext(DurationContext);
  const COUNTDOWN_SECONDS = duration || 30;

  const { mode } = useContext(ModeContext);
  const testMode = mode || "Paragraph";

  const [state, setState] = useState("start");
  
  const { timeLeft, startCountdown, resetCountdown } = useCountdown(COUNTDOWN_SECONDS);
  const { words, updateWords } = useWords(NUMBER_OF_WORDS, testMode);
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
    state !== "finish"
  );
  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    debug("restarting...");
    resetCountdown(duration || 30);
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped, duration, testMode]);
  
  const sumErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  // send data to server


const sendResultsToServer = async (resultsData) => {
  if (!userId) {
    console.error('User is not logged in. Results cannot be sent to server.');
    return;
  }

  console.log(resultsData);
  try {
    const response = await axios.post('http://localhost:5000/results/', resultsData);
    console.log('Results sent to server successfully');
  } catch (error) {
    console.error('Error sending results to server:', error.message);
  }
};


  // as soon as the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we've finished
  useEffect(() => {
    if (!timeLeft && state === "run") {
      debug("time is up...");
      setState("finish");
      sumErrors();

      let total = totalTyped - errors;

      let cpms = 0;

    
      if(duration === 15){
        cpms = (total - errors)*4;
      }else if(duration === 30){
        cpms = (total - errors)*2;
      }
      else{
        cpms = (total - errors);
      }
      // Send results to server here
      sendResultsToServer({
        userId: localStorage.getItem('userId'), 
        typed: totalTyped,
        accuracy: ((totalTyped - errors) / totalTyped),
        cpm: cpms,
        error: errors
      });
    }
  }, [timeLeft, state, sumErrors, typed, totalTyped, errors, duration]);

  // when the current words are all filled up, we generate and show another set of words
  useEffect(() => {
    if (areWordsFinished) {
      debug("words are finished...");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  return { state, words, typed, errors, restart, timeLeft, totalTyped };
};

export default useEngine;
