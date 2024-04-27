import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import Clients from './pages/Clients/Clients';
import { ClientCreate } from './pages/Clients/Create';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />

          <Route path="/clients" element={<Clients loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/clients/create" element={<ClientCreate loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />

          <Route path="/home" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App