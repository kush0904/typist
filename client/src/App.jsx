import React from "react";
import MainPage from  "./components/MainPage";
import { DurationProvider } from "./components/DurationContext";




const App = () => {


  return (
    <>
      <DurationProvider>
        <MainPage />
      </DurationProvider>
    </>
  );
};


export default App;