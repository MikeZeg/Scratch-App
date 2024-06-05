import React from 'react';
import { useEffect, useState } from "react"
import './styles/App.css';
import LandingPage from "./components/landingPage.js";
import { LogIn } from './components/login.js';

const App = () => {
  return (
      <div>
        {/* <LandingPage/> */}
        <LogIn/>
      </div>
    );
}

export default App;
