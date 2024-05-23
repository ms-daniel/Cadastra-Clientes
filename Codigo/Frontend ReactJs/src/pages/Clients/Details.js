import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Avatar } from '@mui/material';
import Layout from '../../shared/Layout';
import { getClient, getLogotipo } from '../../services/ClientActions';
import { Card, CardContent, CardMedia } from '@mui/material';
import noImage from '../../assets/images/noimage.png';
import showToastMessage from '../../components/Notify';


const ClientDetails = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [logoView, setLogoView] = useState(noImage);

    const { id } = useParams();

    const fetchClient = async () => {
        try {
            await getClient(id)
            .then((response) => {
                setName(response.name);
                setEmail(response.email);
            })
            .catch((error)=>{
                showToastMessage(error.msgType, error.msg);
                if(error.error == 404){
                    navigate('/clients', { replace: true });
                } else if(error.error == 401){
                    localStorage.removeItem('accessToken');
                }
            });
        } catch (error) {
            showToastMessage('error', 'Error fetching client details');
        }
    };

    const fetchClientLogo = async () => {
        const response = await getLogotipo(id)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            showToastMessage(error.msgType, error.msg);
            if(error.error == 401){
                localStorage.removeItem('accessToken');
            }
            return null;
        });

        if (response != null) {
            setLogoView("data:image/png;base64," + response);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            fetchClient();
            fetchClientLogo();
        } else {
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);

    return (
        <Layout>
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }} className='flex col align-items-center my-5 py-5'>
                <Typography variant="h4" align="center" gutterBottom>
                    <b>Client Details</b>
                </Typography>
                <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
                    <Avatar
                        src={logoView}
                        alt="Client logo"
                        sx={{ width: 250, height: 250, margin: 'auto', marginTop: 2 }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: {email}
                        </Typography>
                    </CardContent>

                    <Button
                        variant="text"
                        color="primary"
                        href={"/addresses/" + id}
                        className='mb-2'
                    >
                        View addresses
                    </Button>

                </Card>
                <div className="d-flex justify-content-center mt-3">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => history.push('/list')} // Redirecionar de volta à lista de entidades
                        className="me-3"
                        href='/clients'
                    >
                        Back to the List
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        href={"/clients/edit/" + id}
                    >
                        Edit
                    </Button>
                </div>


            </Box>
        </Layout>
    );
};

export default ClientDetails;