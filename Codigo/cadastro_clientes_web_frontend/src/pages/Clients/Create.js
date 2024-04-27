import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Layout from '../../shared/Layout';
import { createClient } from '../../services/Api';
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logotipoImg, setLogotipoImg] = useState(null);

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLogotipoImgChange = (event) => {
    setLogotipoImg(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // Implementar a lógica para enviar os dados para o backend
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('LogotipoImg', logotipoImg);

    try {
        await createClient(formData);

    } catch (error) {
        console.error('Erro ao criar a entidade:', error);
    }
  };

  return (
    <Layout>
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }} className='flex col align-items-center my-5 py-5'>
            <Typography variant="h4" gutterBottom>
                <b>Create New Client</b>
            </Typography>
            <form>
                <div className="mb-3">
                    <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    variant="outlined"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    variant="outlined"
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogotipoImgChange}
                    />
                </div>
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

export {Create as ClientCreate};
