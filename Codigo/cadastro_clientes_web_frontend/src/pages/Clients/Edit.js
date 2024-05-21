import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { editClient } from '../../services/Api';
import Layout from '../../shared/Layout';
import { getClient, getLogotipo, updateClient } from '../../services/ClientActions';
import { Card, CardContent, CardMedia, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import noImage from '../../assets/images/noimage.png';
import showToastMessage from '../../components/Notify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ClientEdit = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [logotipoImg, setLogotipoImg] = useState(null);
    const [logoView, setLogoView] = useState(noImage);

    const { id } = useParams();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleLogotipoImgChange = (event) => {
        const cachedURL = URL.createObjectURL(event.target.files[0]);
        setLogoView(cachedURL);
        setLogotipoImg(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('Id', id);
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('LogotipoImg', logotipoImg);

        try {
            await updateClient(formData)
            .then((promise) => {
                navigate('/clients', { replace: true });
                showToastMessage(promise.msgType, promise.msg);
            })
            .catch((error) => {
                showToastMessage(error.msgType, error.msg);
            });
        } catch (error) {
            console.error('Error updating entity', error);
            showToastMessage('error', 'errraaaado');
        }
    };

    const fetchClient = async () => {
        try {
            await getClient(id)
            .then((response) => {
                setName(response.name);
                setEmail(response.email);
            });
        } catch (error) {

        }
    };

    const fetchClientLogo = async () => {
        try {
            await getLogotipo(id)
            .then((response) => {
                if(response != null) {
                    setLogoView("data:image/png;base64," + response);
                }
            });
        } catch (error) {
            if ( error === 401) {
                showToastMessage('error', 'Request not authorized');
            }
        }
    };

    useEffect(() => {
        if (props.loggedIn) {
            fetchClient();
            fetchClientLogo();
        } else {
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            logotipoImg: e.target.files[0]
        });
    };

    return (
        <Layout>
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }} className='flex col align-items-center my-5 py-5'>
                <Typography variant="h4" align="center" gutterBottom>
                    <b>Edit Client</b>
                </Typography>
                <form>
                    <div id="logoImg">
                        <img src={logoView} className="rounded img-fluid img-thumbnail" width="50%" id="imgLogotipo"/>
                    </div>

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        className='mt-2'
                        startIcon={<CloudUploadIcon />}
                    >
                        Change Image
                        <VisuallyHiddenInput type="file" accept=".png, .jpg" onChange={handleLogotipoImgChange}/>
                    </Button>

                    <TextField
                        label="Nome"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
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
                            href='/clients'
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

export default ClientEdit;
