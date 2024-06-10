import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react"
import './styles/App.css';

import LandingPage from "./components/LandingPage.js";
// import { LogIn } from './components/login/login.js';

import { LogOut } from './components/login/LogOut.js';
import { SignIn } from './components/login/SignIn.js';
import { CreateAccount } from './components/login/CreateAccount.js';
import { SignInByGoogle } from './components/login/SignInByGoogle.js';
import { ResetLogIn } from './components/login/ResetLogIn.js';



const App = () => {
  return (
<div>
    <h1>App level</h1>
      <nav>
        {/* <Link to="/">Home</Link>
        <Link to="/signIn">Sign In</Link>
        <Link to="/createAccount">Create Account</Link>
        <Link to="/signInByGoogle">Sign In By Google</Link>
        <Link to="/logOut">Log Out</Link>
        <Link to="/reset">Reset</Link> */}
      </nav>

      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path="signIn" element={<SignIn/>} />
          <Route path="createAccount" element={<CreateAccount/>} />
          <Route path="signInByGoogle" element={<SignInByGoogle/>} />
          <Route path="logOut" element={<LogOut/>} />
          <Route path='reset' element={<ResetLogIn/>} />
      </Routes>

</div>
    );
}

export default App;
