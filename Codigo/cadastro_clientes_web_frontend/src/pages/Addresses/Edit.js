import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import Layout from '../../shared/Layout';
import { getAddress, updateAddress } from '../../services/AddressesActions';
import { Card, CardContent, CardMedia, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import noImage from '../../assets/images/noimage.png';
import showToastMessage from '../../components/Notify';

const AddressEdit = (props) => {
    const navigate = useNavigate();
    const [clientName, setClientName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighbor, setNeighbor] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');


    const { id } = useParams();
    
    const handleStreetChange = (event) => {
        setStreet(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleNeighborChange = (event) => {
        setNeighbor(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('Id', id);
        formData.append('Cliente_Id', '')
        formData.append('Rua', street);
        formData.append('Numero', number);
        formData.append('Bairro', neighbor);
        formData.append('Cidade', city);
        formData.append('Estado', state);
        formData.append('Cep', postalCode);
        
        try {
            await updateAddress(formData)
            .then((promise) => {
                navigate('/Addresses', { replace: true });
                showToastMessage(promise.msgType, promise.msg);
            })
            .catch((error) => {
                showToastMessage(error.msgType, error.msg);
                if(error.error == 401){
                    localStorage.removeItem('accessToken');
                }
            });
        } catch (error) {
            console.error('Error updating entity', error);
            showToastMessage('error', 'Error when trying to edit address');
        }
    };

    const fetchAddress = async () => {
        await getAddress(id)
        .then((response) => {
            setClientName(response.clienteName);
            setStreet(response.rua);
            setNumber(response.numero);
            setNeighbor(response.bairro);
            setCity(response.cidade);
            setState(response.estado);
            setPostalCode(response.cep);
        })
        .catch((error) => {
            showToastMessage(error.msgType, error.msg);
            if(error.error == 404){
                navigate('/addresses', { replace: true });
            } else if(error.error == 401){
                localStorage.removeItem('accessToken');
            }
        });
    };


    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchAddress();
        } else {
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Layout>
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }} className='flex col align-items-center my-5 py-5'>
                <Typography variant="h4" align="center" gutterBottom>
                    <b>Edit Address</b>
                </Typography>
                <form>
                    <TextField
                        label="Client Name"
                        name="clientName"
                        value={clientName}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Street"
                        name="street"
                        value={street}
                        onChange={handleStreetChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Number"
                        name="street"
                        value={number}
                        onChange={handleNumberChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Neighborhood"
                        name="neighborhood"
                        value={neighbor}
                        onChange={handleNeighborChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="City"
                        name="city"
                        value={city}
                        onChange={handleCityChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="State"
                        name="state"
                        value={state}
                        onChange={handleStateChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Postal Code"
                        name="postal_code"
                        value={postalCode}
                        onChange={handlePostalCodeChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => history.push('/list')} // Redirecionar de volta à lista de entidades
                            className="me-3"
                            href='/addresses'
                        >
                            Back to the List
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Box>
        </Layout>
    );
};

export default AddressEdit;
