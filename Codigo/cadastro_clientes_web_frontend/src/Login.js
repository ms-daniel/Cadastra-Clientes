import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './services/Api'
import LoadingComp from './components/Loading'
import showToastMessage from './components/Notify'
import {ToastContainer} from "react-toastify";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = (props) => {
  const [username, setUsername] = useState('desafio')
  const [password, setPassword] = useState('123456')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loadComp, setloadComp] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
      <div>
        <Box
          sx={{
            width: 400,
            maxWidth: '100%',
          }}
        >
          <TextField
            id="filled-basic"
            label="Username"
            fullWidth 
            variant="filled" 
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </Box>
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div>
        <FormControl sx={{ m: 1, width: '400px' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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