import React, { useState } from "react";
import GeneratedWords from "./GeneratedWords";
import RestartButton from "./RestartButton";
import Results from "./Results";
import UserTypings from "./UserTypings";
import useEngine from "../hooks/useEngine";
import DurationSelect from "./DurationSelect";
import { calculateAccuracyPercentage } from "../utils/helpers";
import Keyboard from "./Keyboard";

const MainPageForKeys = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped } = useEngine();

  return (
    <div className="grid place-items-center max-h-screen font-mono tracking-wider" style={{ backdropFilter: "blur(3px)" }}>
      <DurationSelect disabled={state !== "start"} />
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        <UserTypings className="absolute inset-0" words={words} userInput={typed} />
      </WordsContainer>
        <RestartButton className={"mx-auto mt-10 text-slate-500"} onRestart={() => { restart(); document.activeElement.blur(); }} />
      {timeLeft > 0 && <Keyboard />}
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        duration={timeLeft}
      />
    </div>
  );
};

const WordsContainer = ({ children }) => {
  return <div className="relative text-2xl leading-relaxed break-all mt-3">{children}</div>;
};

const CountdownTimer = ({ timeLeft }) => {
  const timerClassName = timeLeft <= 9 && timeLeft > 0 ? "blinking" : "";
  return (
    <h2 className="text-primary-400 mt-7 font-medium">
      Time Left: <span className={timerClassName}>{timeLeft}</span>
    </h2>
  );
};

export default MainPageForKeys;
