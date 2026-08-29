import React, {useEffect, Suspense, lazy} from "react";
import useGameStore from "./store/useGameStore";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainPage from "./components/MainPage";
import Navbar from "./components/NavBar/Navbar";
import { DurationProvider } from "./components/DurationContext";
import { ModeProvider } from "./components/ModeContext";
import { AuthProvider } from "./contexts/authContext";
import ShowDetailedResults from "./components/ShowDetailedResults";
import {NextUIProvider} from "@nextui-org/react";
import Loader from "./components/Loader";
import { DetailedAccounts } from "./components/DetailedAccount";

import { Contact } from "./components/Contact";


/* Typing game */

import GameMenu from "./GameFolder/GameMenu";
import socket from './socketConfig';
import CreateGame from "./GameFolder/CreateGame";
import JoinGame from "./GameFolder/JoinGame";
import TypeRacer from "./GameFolder/TypeRacer";

const About = lazy(() => import("./components/About"));
const Login = lazy(() => import("./auth/login"));
const Register = lazy(() => import("./auth/register"));
const BackGround = lazy(() => import("./components/BackGround"));
const Particles = lazy(() => import("./components/Particles"));
const FallingWords = lazy(() => import("./components/FallingWords"));
const TrippyScroll = lazy(() => import("./components/TrippyScroll"));
const StarsCanvas = lazy(() => import("./components/StarCanvas"));
const WithKeyBoard = lazy(() => import("./components/WithKeyBoard"));
const Beams = lazy(() => import("./components/Beams"));
const AuroraBackgroundDemo = lazy(() => import("./components/AuroraBackGroundDemo").then(m => ({ default: m.AuroraBackgroundDemo })));

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);

  useEffect(() => {
    socket.on('updateGame', (game) => {
      console.log(game);
      setGameState(game);
    });

    return ()=>{
      socket.off('updateGame');
    }
  }, [setGameState]);

  useEffect(()=>{
    if(gameState._id !== ""){
      navigate(`/game/${gameState._id}`);
    }
  },[gameState._id, navigate]);


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
          <Suspense fallback={<Loader />}>
            {location.pathname !== '/fallingwords' && <Navbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />

              <Route path="/fallingwords" element = {<FallingWords />} />
              <Route path="/scroll" element = {<TrippyScroll />} />
              <Route path="/details" element = {<DetailedAccounts />} />
              <Route path="/keys" element = {<KeyboardMode />} />

              <Route path="/star" element = {<StarsCanvas />} />
              <Route path="/contact" element = {<ContactContainer />} />
              <Route path="/beams" element = {<Beams />} />
              <Route path="/back" element = {<AuroraBackgroundDemo />} />

              <Route path="/results/:userId" element={<ShowDetailedResults />} />

              <Route path="/detailed" element = {<DetailedAccounts />} />
              <Route path="/about" element = {<About />} />
              {/* Game */}
              <Route path="/game" element={<GameMenu />} />
              <Route path="/game/create" element={<CreateGame />} />
              <Route path = "/game/join" element = { <JoinGame /> } />
              <Route path="/game/:gameID" element={<TypeRacer />} />        
            </Routes>
          </Suspense>
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

const ContactContainer = () => {
  return (
    <>
      <Contact />
    </>
  );
}


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
