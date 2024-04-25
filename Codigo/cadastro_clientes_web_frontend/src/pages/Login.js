import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {logIn} from '../services/Api'
import LoadingComp from '../components/Loading'
import {ToastContainer} from "react-toastify";
import Button from '@mui/material/Button';
import {UsernameField, PasswordField} from '../components/LoginComponents';

const Login = (props) => {
  const [usernameValue, setUsername] = useState('desafio')
  const [passwordValue, setPassword] = useState('123456')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loadComp, setLoadComp] = useState(false)

  const navigate = useNavigate()

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');
  
    if ('' === usernameValue) {
      setEmailError('Please enter your username');
      return;
    }
  
    if ('' === passwordValue) {
      setPasswordError('Please enter a password');
      return;
    }
    setLoadComp(true);
  
    logIn({usernameValue, passwordValue, setLoadComp});
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div>
        <UsernameField usernameValue={usernameValue} setFunction={setUsername}/>
        <label className="errorLabel">{emailError}</label>
      </div>

      <br />

      <div>
        <PasswordField passwordValue={passwordValue} setFunction={setPassword}/>
        <label className="errorLabel">{passwordError}</label>
      </div>

      <br />
      <div className={'inputContainer'}>
        {loadComp ? (<LoadingComp />) : (<Button variant="contained" size="large" onClick={onButtonClick}>Login </Button>) }
      </div>

      <ToastContainer />
    </div>
  )
}

export default Login