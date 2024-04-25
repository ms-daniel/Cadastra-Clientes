import axios from "axios";
import showToastMessage from '../components/Notify'

const api = axios.create({
  baseURL: "https://localhost:7268/api",
});

const logIn = ({usernameValue, passwordValue, setLoadComp}) => {
    api
      .post("/auth/", {
        username: usernameValue,
        password: passwordValue
      })
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        localStorage.setItem('accessToken', response.data.token);
        showToastMessage('success', 'Login successful!');
        setLoadComp(false);
      })
      .catch((err) => {
        if(err.response && err.response.data && err.response.data.fromServer){
          showToastMessage('error', 'Incorrect username or password.');
        } else {
          showToastMessage('error', 'Some unknown error occurred: ');
        }
        setLoadComp(false);
      });
};

export {logIn};