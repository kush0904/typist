import cn from "classnames";
import Caret from "./Caret";

const UserTypings = ({
  userInput,
  words,
  className = "relative text-3xl max-w-xl leading-relaxed break-words mt-3",
}) => {
  const typedCharacters = userInput.split("");
  const allCharacters = words.split("");

  return (
    <div className={className}>
      {allCharacters.map((char, index) => {
        if (index < typedCharacters.length) {
          return (
            <Character
              key={`${char}_${index}`}
              actual={typedCharacters[index]}
              expected={char}
            />
          );
        } else if (index === typedCharacters.length) {
          return (
            <span key={`${char}_${index}`} className="relative">
              <Caret className="absolute -left-[1px] top-1" />
              <span className="text-slate-500">{char}</span>
            </span>
          );
        } else {
          return (
            <span key={`${char}_${index}`} className="text-slate-500">
              {char}
            </span>
          );
        }
      })}
      {typedCharacters.length >= allCharacters.length && (
        <span className="relative">
          <Caret className="absolute -left-[1px] top-1" />
        </span>
      )}
    </div>
  );
};

const Character = ({
  actual,
  expected,
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace,
        "text-primary-400": isCorrect && !isWhiteSpace,
        "bg-red-500/50": !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
