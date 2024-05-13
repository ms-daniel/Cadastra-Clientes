import axios from "axios";
import showToastMessage from '../components/Notify';

const api = axios.create({
  baseURL: "https://localhost:7268/api",
  timeout: 5000
});

export const logIn = ({ usernameValue, passwordValue}) => {
  return new Promise((resolve, reject) => {
    api.post("/auth/", {
      username: usernameValue,
      password: passwordValue
    })
    .then((response) => {
      localStorage.setItem('accessToken', response.data.token);
      showToastMessage('success', 'Login successful!');
      resolve(true); // Resolve a promessa com true quando o login for bem-sucedido
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.fromServer) {
        showToastMessage('error', 'Incorrect username or password.');
      } else {
        showToastMessage('error', 'Some unknown error occurred.');
      }
      reject(false); // Rejeita a promessa com false quando o login falhar
    });
  });
};

export default api;