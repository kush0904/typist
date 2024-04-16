import React from "react";
import GeneratedWords from "./GeneratedWords";
import RestartButton from "./RestartButton";
import Results from "./Results";
import UserTypings from "./UserTypings";
import useEngine from "../hooks/useEngine";
import DurationSelect from "./DurationSelect";
import { calculateAccuracyPercentage } from "../utils/helpers";
import { useContext } from "react";
import { DurationContext } from "./DurationContext";

const MainPage = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped } = useEngine();
  const { duration } = useContext(DurationContext);

  return (
    <>
      <DurationSelect disabled={state !== "start"} />
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        <UserTypings className="absolute inset-0" words={words} userInput={typed} />
      </WordsContainer>
      <RestartButton className={"mx-auto mt-10 text-slate-500"} onRestart={restart} />
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </>
  );
};

const WordsContainer = ({ children }) => {
  return <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">{children}</div>;
};

const CountdownTimer = ({ timeLeft }) => {
  const timerClassName = timeLeft <= 9 && timeLeft >0 ? "blinking" : "";
  return (
    <h2 className="text-primary-400 mt-7 font-medium">
      Time Left:{" "}
      <span className={timerClassName}>{timeLeft}</span> 
    </h2>
  );
};


export default MainPage;
