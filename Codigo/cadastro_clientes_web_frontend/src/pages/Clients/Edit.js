import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { editClient } from '../../services/Api';
import Layout from '../../shared/Layout';
import { getClient } from '../../services/Api';

const ClientEdit = (props) => {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtém o id do cliente da URL

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        logotipoImg: null
    });

    const fetchClient = async () => {
        try {
            const data = await getClient(id);
            setFormData(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
            //showToastMessage('error', 'Failed to fetch clients.');
        }
    };

    useEffect(() => {
        if (props.loggedIn) {
            fetchClient();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log
            //await editClient(id, formData);
            //navigate('/clients');
        } catch (error) {
            console.error('Erro ao editar cliente:', error);
            
        }
    };

    return (
        <Layout>
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }} className='flex col align-items-center my-5 py-5'>
                <Typography variant="h4" align="center" gutterBottom>
                    <b>Edit Client</b>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFileChange}
                        style={{ marginBottom: '10px' }}
                    />
                    <div className="d-flex justify-content-center">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => history.push('/list')} // Redirecionar de volta à lista de entidades
                            className="me-3"
                            href='/clients'
                        >
                            Back to the List
                        </Button>

                        <Button type="submit" variant="contained" color="primary">
                            Salvar Alterações
                        </Button>
                    </div>
                </form>
            </Box>
        </Layout>
    );
};

export default ClientEdit;
