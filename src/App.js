import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet, BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import './styles/App.css';

import LandingPage from "./components/LandingPage.js";
// import { LogIn } from './components/login/login.js';

import { LogOut } from './components/login/LogOut.js';
import { SignIn } from './components/login/SignIn.js';
import { CreateAccount } from './components/login/CreateAccount.js';
import { SignInByGoogle } from './components/login/SignInByGoogle.js';
import { ResetLogIn } from './components/login/ResetLogIn.js';
import { User } from "./components/mainComponents/User.js"
import { Setting } from "./components/mainComponents/Setting.js"
import { Main } from "./components/Main.js";
import { NavBar } from "./components/mainComponents/NavBar.js"

// useNavigation -> to move user after log In or if already login

const App = () => {
  return (
<div> 
      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path="signIn" element={<SignIn/>} />
          <Route path="createAccount" element={<CreateAccount/>} />
          <Route path="signInByGoogle" element={<SignInByGoogle/>} />
          <Route path="logOut" element={<LogOut/>} />
          <Route path='reset' element={<ResetLogIn/>} />
          <Route path='*' element={<LandingPage/>} />
          <Route path='Main' element={<Main/>} />
          <Route path='/User' element={<User/>}/>
          <Route path='/Setting' element={<Setting/>}/>
          <Route path='/NavBar' element={<NavBar/>}/>
      </Routes>
</div>
    );
}

export default App;
