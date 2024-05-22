import api from './Api';

/**
 * requests list of clients
 * @param {number} pageNumber - current page
 * @param {number} pageQuantity - number of lines per page
 * @returns 
 */
const getAllClients = ({ pageNumber, pageQuantity, order }) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('accessToken');
  
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { pageNumber, pageQuantity , order}
        };
  
        api.get("/client/getall", config)
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
 * requests a clients
 * @param {number} id - client id
 * @returns 
 */
const getClient = (id) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            api.get("/client/get/"+id, config)
            .then((response) => {
                resolve(response.data);
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
                        msg: 'Client not found.',
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

const getLogotipo = (id) => {
    return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'arraybuffer' 
        };

        api.get(`/client/images/${id}`, config)
        .then((response) => {
            if(response.status == 204 ){
                resolve(null);
            } else {
                const byteArray = new Uint8Array(response.data);
                let binaryString = '';

                byteArray.forEach((byte) => {
                    binaryString += String.fromCharCode(byte);
                });
                const base64Image = btoa(binaryString);
                resolve(base64Image);
            }
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
}

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
                } else if (err.response && err.response.status === 400){
                if (err.response.data.error === "SqlUE" ){
                    reject({ msgType: 'error', msg: 'Email is already being used.'});
                } else {
                    reject({ msgType: 'error', msg: 'Something is wrong.' });
                }
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
                msg: 'Invalid token. Login Again! Need login.'
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
            resolve({
                msgType: 'success',
                msg: 'Client deleted successfully',
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
 * client creation
 * @param {formData} formData - data for client creation
 * @returns 
 */
const updateClient = (formData) => {
    return new Promise((resolve, reject) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Type': 'multipart/form-data',
        };

        api.put("/client/edit", formData, config)
        .then((response) => {
            resolve(
            {
                msgType: 'success',
                msg: 'Client update successfully!'
            }
            );
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                reject({
                    msgType: 'error',
                    msg: 'Request not authorized.'
                });
            } else if (err.response && err.response.status === 400){
                if (err.response.data.error === "SqlUE" ){
                    reject({
                        msgType: 'error', 
                        msg: 'Email is already being used.'
                    });
                } else {
                    reject({
                        msgType: 'error', 
                        msg: 'Something is wrong.' 
                    });
                }
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
            msg: 'Invalid token. Login Again!'
        });
    }
    });
};

export {getAllClients, getClient,createClient, deleteClient, getLogotipo, updateClient};