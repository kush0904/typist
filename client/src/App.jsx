import React, {useEffect} from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Navbar from "./components/NavBar/Navbar";
import { DurationProvider } from "./components/DurationContext";
import { ModeProvider } from "./components/ModeContext";
import Login from "./auth/login";
import Register from "./auth/register";
import Header from "./auth/header";
import { AuthProvider } from "./contexts/authContext";
import ShowDetailedResults from "./components/ShowDetailedResults";
import {NextUIProvider} from "@nextui-org/react";
import BackGround from "./components/BackGround";
import Particles from "./components/Particles";
import Loader from "./components/Loader";
import FallingWords from "./components/FallingWords";
import TrippyScroll from "./components/TrippyScroll";
import StarsCanvas from "./components/StarCanvas";
import { DetailedAccounts } from "./components/DetailedAccount";
import Keyboard from "./components/Keyboard";

import WithKeyBoard from "./components/WithKeyBoard";
import { Contact } from "./components/Contact";
import Beams from "./components/Beams";


const App = () => {


  useEffect(() => {
    const handleSpacebarScroll = (e) => {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleSpacebarScroll);

    return () => {
      window.removeEventListener("keydown", handleSpacebarScroll);
    };
  }, []); 

  return (
    <NextUIProvider>

    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />


          <Route path="/game" element = {<FallingWords />} />
          <Route path="/scroll" element = {<TrippyScroll />} />
          <Route path="/details" element = {<DetailedAccounts />} />
          <Route path="/keys" element = {<KeyboardMode />} />

          <Route path="/star" element = {<StarsCanvas />} />
          <Route path="/contact" element = {<Contact />} />
          <Route path="/beams" element = {<Beams />} />





          <Route path="/results/:userId" element={<ShowDetailedResults />} />
        </Routes>
      </Router>
    </AuthProvider>
    </NextUIProvider>
  );
};


const KeyboardMode = () => (
  <>
    <DurationProvider>
      <ModeProvider>
        <WithKeyBoard />
      </ModeProvider>
    </DurationProvider>
  </>
)

const Home = () => (
  <>
    <DurationProvider>
      <ModeProvider>
        <BackGround />
        <Contact />

      </ModeProvider>
    </DurationProvider>
  </>
);

export default App;
