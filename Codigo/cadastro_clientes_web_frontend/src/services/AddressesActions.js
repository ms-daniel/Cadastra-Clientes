import api from './Api';
import showToastMessage from '../components/Notify';

/**
 * requests list of addresses
 * @param {number} pageNumber - current page
 * @param {number} pageQuantity - number of lines per page
 * @returns 
 */
const getAllAddresses = ({ pageNumber, pageQuantity, order, clientId = null }) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('accessToken');

      let url = "getall";

      if(clientId){
        url = "getbyclient/" + clientId;
        console.log('entrou aqui')
      }

      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { pageNumber, pageQuantity , order, clientId}
        };
  
        api.get("/logradouro/" + url, config)
          .then((response) => {
            resolve(response.data); // Resolva a promessa com os dados da resposta
          })
          .catch((err) => {
            if (err.response && err.response.status === 401) {
                reject({
                    msgType: 'error',
                    msg: 'Request not authorized. Login Again!',
                    error: err.response.status
                });
            } else {
                reject({
                    msgType: 'error',
                    msg: 'Some unknown error occurred.',
                    error: err.response.status
                });
            }
        });
    } else {
        reject({
            msgType: 'error',
            msg: 'Invalid token. Login Again!'
        }); 
    }
    });
};
  
/**
 * requests a address
 * @param {number} id - address id
 * @returns 
 */
const getAddress = (id) => {
    return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };

        api.get("/logradouro/get/"+id, config)
        .then((response) => {
            resolve(response.data); // Resolva a promessa com os dados da resposta
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                reject({
                    msgType: 'error',
                    msg: 'Request not authorized.',
                    error: err.response.status
                });
            } else if (err.response && err.response.status === 404) {
                reject({
                    msgType: 'error',
                    msg: 'Address not found.',
                    error: err.response.status
                });
            } else {
                reject({
                    msgType: 'error',
                    msg: 'Some unknown error occurred.'
                });
            }
        });
    } else {
        reject({
            msgType: 'error',
            msg: 'Invalid token. Login Again!'
        });
    }
    });
};

/**
 * address creation
 * @param {formData} formData - data for address creation
 * @returns 
 */
const createAddress = (formData) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                'Content-Type': 'multipart/form-data'
            };

            api.post("/logradouro/create", formData, config)
            .then((response) => {
                resolve({
                    msgType: 'success',
                    msg: 'Address created successfully!'
                });
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    reject({
                            msgType: 'error',
                            msg: 'Request not authorized.'
                    });
                } else if (err.response && err.response.status === 400){
                    console.log(err.response);
                    reject({
                            msgType: 'error',
                            msg: 'Something is wrong.'
                    });
                } else {
                    reject({
                        msgType: 'error',
                        msg: 'Some unknown error occurred.'
                    });
                }
                
            });
        } else {
            reject({
                msgType: 'info',
                msg: 'Invalid token. Need login.'
            });
        }
    });
};

const deleteAddress = (idAd) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: { id: idAd }
            };

            api.delete("/logradouro/delete/" + idAd, config)
            .then((response) => {
                resolve({
                    msgType: 'success',
                    msg: 'Address deleted successfully',
                });
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    reject({
                        msgType: 'error',
                        msg: 'Request not authorized. Login Again!',
                        error: err.response.status
                    });
                } else {
                    reject({
                        msgType: 'error',
                        msg: 'Some unknown error occurred.',
                        error: err.response.status
                    });
                }
            });
        } else {
            reject({
                msgType: 'error',
                msg: 'Invalid token. Login Again!'
            }); 
        }
    });
};

/**
 * address creation
 * @param {formData} formData - data for address creation
 * @returns 
 */
const updateAddress = (formData) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                'Content-Type': 'multipart/form-data',
            };

            api.put("/logradouro/edit", formData, config)
            .then((response) => {
                resolve(
                    {
                        msgType: 'success',
                        msg: 'Address update successfully!'
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
                } else if (err.response && err.response.status === 400){
                    reject(
                        { 
                            msgType: 'error',
                            msg: 'Something is wrong.' 
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

export {getAllAddresses, getAddress,createAddress, deleteAddress, updateAddress};