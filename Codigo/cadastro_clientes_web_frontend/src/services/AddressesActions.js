import api from './Api';


/**
 * requests list of addresses
 * @param {number} pageNumber - current page
 * @param {number} pageQuantity - number of lines per page
 * @returns 
 */
const getAllAddresses = ({ pageNumber, pageQuantity, order }) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('accessToken');
  
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { pageNumber, pageQuantity , order}
        };
  
        api.get("/logradouro/getall", config)
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
        'Content-Type': 'multipart/form-data',
    };

    api.post("/logradouro/create", formData, config)
    .then((response) => {
        resolve(
        {
            msgType: 'success',
            msg: 'Address created successfully!'
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
            reject({ msgType: 'error', msg: 'Something is wrong.' });
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
        showToastMessage('success', 'Address deleted successfully');
        resolve(true);
    })
    .catch((err) => {
        if (err.response && err.response.status === 401) {
        showToastMessage('error', 'Request not authorized');
        } else {
        showToastMessage('error', 'Error when trying to delete address.');
        }
        reject(err);
    });
    } else {
        showToastMessage('info', 'Invalid token.');
        reject(new Error('Invalid token'));
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
                reject({ msgType: 'error', msg: 'Something is wrong.' });
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