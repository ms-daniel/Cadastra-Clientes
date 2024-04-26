import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {logIn} from '../services/Api';
import LoadingComp from '../components/Loading';
import {ToastContainer} from "react-toastify";
import Button from '@mui/material/Button';
import {UsernameField, PasswordField} from '../components/LoginComponents';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <div className='container d-flex align-items-center justify-content-center vh-100'>
      { props.loggedIn ? (navigate('/home')) : (
          <div className={'container-fluid flex'}>

            <div className={'titleContainer'}>
              <div>Login</div>
            </div>
            <br />
            <div className="d-flex justify-content-center">
              <UsernameField usernameValue={usernameValue} setFunction={setUsername}/>
              {/*<label className="errorLabel">{emailError}</label>*/}
            </div>

            <div className="d-flex justify-content-center">
              <PasswordField passwordValue={passwordValue} setFunction={setPassword}/>
              {/*<label className="errorLabel">{passwordError}</label>*/}
            </div>

            <br />
            <div className="d-flex justify-content-center">
              {loadComp ? (<LoadingComp />) : (<Button variant="contained" size="large" onClick={onButtonClick}>Login </Button>) }
            </div>

            <ToastContainer />
          </div>
        )
      }
    </div>
  );
}

export default Login;