import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './services/Api'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [token, setToken] = useState('')

  const navigate = useNavigate()

  const logIn = () => {
    console.log('Olha aqui o usuário: ' + username); // Certifique-se de que 'username' está definido e tem um valor válido
    console.log('Olha aqui a senha: ' + password); // Certifique-se de que 'password' está definido e tem um valor válido
    api
      .post("/auth/", {
        username: 'desafio',
        password: '123456'
      })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        setToken(response.data); // Certifique-se de que 'setToken' está definido e faz o que você espera
      })
      .catch((err) => {
        console.error('Erro ao fazer requisição:', err);
      });
  }

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('');
    setPasswordError('');
  
    // Check if the user has entered both fields correctly
    if ('' === username) {
      setEmailError('Please enter your username');
      return;
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }
  
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
      <div>
        <p>{ token ? token : 'sem token'}</p>
        <p>username: {username}</p>
        <p>senha: {password}</p>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login