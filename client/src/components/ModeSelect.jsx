import React, { useContext } from "react";
import { ModeContext } from "./ModeContext";

const ModeSelect = ({ disabled }) => {
  const { mode, setMode } = useContext(ModeContext);

  const handleModeChange = (value) => {
    setMode(value);
  };

  const options = ["Words", "Paragraph", "Lorem"];

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleModeChange(option)}
          disabled={disabled}
          // className={`px-4 py-2 rounded ${duration === option ? 'bg-black text-white' : 'bg-white text-black'} border border-gray-400 hover:border-gray-500 focus:outline-none focus:shadow-outline ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          className={`px-4 py-2 rounded ${mode === option ? 'text-white' : 'text-zinc-600'} focus:outline-none focus:shadow-outline ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ModeSelect;