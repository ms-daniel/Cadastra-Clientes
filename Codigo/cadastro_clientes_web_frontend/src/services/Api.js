import axios from "axios";
import showToastMessage from '../components/Notify'

const api = axios.create({
  baseURL: "https://localhost:7268/api",
});

const logIn = ({ usernameValue, passwordValue}) => {
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


const getClients = ({ pageNumber, pageQuantity }) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { pageNumber, pageQuantity }
      };

      api.get("/v1/client/getall", config)
        .then((response) => {
          console.log('data dentro do apiu: ' + response.data);
          resolve(response.data); // Resolva a promessa com os dados da resposta
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            showToastMessage('error', 'Request not authorized');
          } else {
            showToastMessage('error', 'Some unknown error occurred.');
          }
          reject(err); // Rejeite a promessa com o erro
        });
    } else {
      showToastMessage('error', 'Invalid token.');
      reject(new Error('Invalid token')); // Rejeite a promessa com um erro
    }
  });
};


export {logIn, getClients};