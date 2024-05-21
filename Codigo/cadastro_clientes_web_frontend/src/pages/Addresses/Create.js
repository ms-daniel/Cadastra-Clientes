import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import Layout from '../../shared/Layout';
import { createAddress } from '../../services/AddressesActions';
import { getClient } from '../../services/ClientActions';
import { Card, CardContent, CardMedia, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import noImage from '../../assets/images/noimage.png';
import showToastMessage from '../../components/Notify';

const AddressCreate = (props) => {
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
        formData.append('ClienteId', id);
        formData.append('Rua', street);
        formData.append('Numero', number);
        formData.append('Bairro', neighbor);
        formData.append('Cidade', city);
        formData.append('Estado', state);
        formData.append('Cep', postalCode);
        
        try {
            await createAddress(formData)
            .then((promise) => {
                navigate('/Addresses/' + id, { replace: true });
                showToastMessage(promise.msgType, promise.msg);
            })
            .catch((error) => {
                showToastMessage(error.msgType, error.msg);
            });
        } catch (error) {
            console.error('Error creating entity', error);
            showToastMessage('error', 'Error when trying to create address');
        }
    };

    const fetchClient = async () => {
        try {
            await getClient(id)
            .then((response) => {
                setClientName(response.name);
            })
            .catch((error) => {
                navigate('/addresses/');
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!props.loggedIn) {
            navigate('/login');
        }
        fetchClient();
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
                            href='/Address'
                        >
                            Back to the List
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Box>
        </Layout>
    );
};

export default AddressCreate;
