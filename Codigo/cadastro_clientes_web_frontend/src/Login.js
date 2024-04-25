import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './services/Api'
import LoadingComp from './components/Loading'
import showToastMessage from './components/Notify'
import {ToastContainer} from "react-toastify";

const Login = (props) => {
  const [username, setUsername] = useState('desafio')
  const [password, setPassword] = useState('123456')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loadComp, setloadComp] = useState(false)

  const navigate = useNavigate()

  const logIn = () => {
    api
      .post("/auth/", {
        username: username,
        password: password
      })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        localStorage.setItem('accessToken', response.data.token);
        showToastMessage('success', 'Login successful!');
        setloadComp(false);
      })
      .catch((err) => {
        if(err.response && err.response.data && err.response.data.fromServer){
          showToastMessage('error', 'Incorrect username or password.');
        } else {
          showToastMessage('error', 'Some unknown error occurred: ');
        }
        setloadComp(false);
      });
  }

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');
  
    if ('' === username) {
      setEmailError('Please enter your username');
      return;
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }
    setloadComp(true);
  
    logIn();
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Username"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        {loadComp ? (<LoadingComp />) : (<input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />) }
      </div>

      <ToastContainer />
    </div>
  )
}

export default Login