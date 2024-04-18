import React, { useContext } from "react";
import { DurationContext } from "./DurationContext";

const DurationSelect = ({ disabled }) => {
  const { duration, setDuration } = useContext(DurationContext);

  const handleDurationChange = (value) => {
    setDuration(value);
  };

  const options = [15, 30, 60];

  return (
    <div className="flex space-x-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleDurationChange(option)}
          disabled={disabled}
          // className={`px-4 py-2 rounded ${duration === option ? 'bg-black text-white' : 'bg-white text-black'} border border-gray-400 hover:border-gray-500 focus:outline-none focus:shadow-outline ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          className={`px-4 py-2 rounded ${duration === option ? 'text-white' : 'text-zinc-600'} focus:outline-none focus:shadow-outline ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}

        >
          {option} seconds
        </button>
      ))}
    </div>
  );
};

export default DurationSelect;