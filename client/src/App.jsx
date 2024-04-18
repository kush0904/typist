import React from "react";
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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/* Change the route to "/results/:userId" */}
          <Route path="/results/:userId" element={<ShowDetailedResults />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const Home = () => (
  <>
    <Navbar />
    <DurationProvider>
      <ModeProvider>
        <MainPage />
      </ModeProvider>
    </DurationProvider>
  </>
);

export default App;
