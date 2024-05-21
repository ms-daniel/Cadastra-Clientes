import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Clients from './pages/Clients/Clients';
import ClientCreate from './pages/Clients/Create';
import ClientEdit from './pages/Clients/Edit';
import Addresses from './pages/Addresses/Addresses';
import AddressEdit from './pages/Addresses/Edit';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <div className="App">
      <ToastContainer limit={2} stacked />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />

          <Route path="/clients" element={<Clients loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/clients/create" element={<ClientCreate loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/clients/edit/:id" element={<ClientEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />

          <Route path="/addresses" element={<Addresses loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/addresses/:id" element={<Addresses loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/addresses/edit/:id" element={<AddressEdit loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />

          <Route path="/home" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
//

export default App