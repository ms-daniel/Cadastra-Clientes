import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App container d-flex align-items-center justify-content-center vh-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
          <Route path="/home" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App