import React, { createContext, useState } from "react";

export const DurationContext = createContext();

export const DurationProvider = ({ children }) => {
  const [duration, setDuration] = useState(30); // Default duration is 30 seconds

  return (
    <DurationContext.Provider value={{ duration, setDuration }}>
      {children}
    </DurationContext.Provider>
  );
};
