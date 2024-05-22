import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Layout from '../../shared/Layout';
import { getAddress } from '../../services/AddressesActions';
import showToastMessage from '../../components/Notify';

const AddressDetails = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [clientName, setClientName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighbor, setNeighbor] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');

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
            }
        });
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchAddress();
        } else {
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);

    return (
        <Layout>
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }} className='flex col align-items-center text-start my-5 py-5'>
                <Typography variant="h4" align="center" gutterBottom>
                    <b>Address Details</b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>Client Name:</b> {clientName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>Street:</b> {street}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>Number:</b> {number}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>Neighborhood:</b> {neighbor}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>City:</b> {city}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>State:</b> {state}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <b>Postal Code:</b> {postalCode}
                </Typography>
                
                <div className="d-flex justify-content-center mt-3">
                    <Button
                        variant="outlined"
                        color="primary"
                        href="/addresses"
                        className="me-3"
                    >
                        Back to the List
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        href={"/addresses/edit/" + id}
                    >
                        Edit
                    </Button>
                </div>  
            </Box>
        </Layout>
    );
};

export default AddressDetails;
