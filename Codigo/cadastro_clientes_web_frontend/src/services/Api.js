import axios from "axios";
import showToastMessage from '../components/Notify';

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

/**
 * requests list of clients
 * @param {number} pageNumber - current page
 * @param {number} pageQuantity - number of lines per page
 * @returns 
 */
const getClients = ({ pageNumber, pageQuantity }) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { pageNumber, pageQuantity }
      };

      api.get("/client/getall", config)
        .then((response) => {
          resolve(response.data); // Resolva a promessa com os dados da resposta
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            showToastMessage('error', 'Request not authorized');
          } else {
            showToastMessage('error', 'Some unknown error occurred.');
          }
          reject(err);
        });
    } else {
      showToastMessage('error', 'Invalid token.');
      reject(new Error('Invalid token')); 
    }
  });
};

/**
 * client creation
 * @param {formData} formData - data for client creation
 * @returns 
 */
const createClient = (formData) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Type': 'multipart/form-data',
      };

      api.post("/client/create", formData, config)
        .then((response) => {
          resolve(
            {
              msgType: 'success',
              msg: 'Client created successfully!'
            }
          );
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            reject(
              {
                msgType: 'error',
                msg: 'Request not authorized.'
              }
            );
          } else {
            reject(
              {
                msgType: 'error',
                msg: 'Some unknown error occurred.'
              }
            );
          }
          
        });
    } else {
      reject(
        {
          msgType: 'info',
          msg: 'Invalid token. Need login.'
        }
      );
    }
  });
};

const deleteClient = (idClient) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { id: idClient }
      };

      api.delete("/client/delete/" + idClient, config)
        .then((response) => {
          showToastMessage('success', 'Client deleted successfully');
          resolve(true);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            showToastMessage('error', 'Request not authorized');
          } else {
            showToastMessage('error', 'Error when trying to delete client.');
          }
          reject(err);
        });
    } else {
      showToastMessage('info', 'Invalid token.');
      reject(new Error('Invalid token'));
    }
  });
};



export {logIn, getClients, createClient, deleteClient};