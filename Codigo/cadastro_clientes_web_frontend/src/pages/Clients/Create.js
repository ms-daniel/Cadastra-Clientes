import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logotipoImg, setLogotipoImg] = useState(null);

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
      // Submeter os dados para o servidor, por exemplo, usando fetch ou axios
      // await fetch('/api/entidades', {
      //   method: 'POST',
      //   body: formData
      // });

    } catch (error) {
      console.error('Erro ao criar a entidade:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create New Entity
      </Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={handleNameChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={handleEmailChange}
        margin="normal"
        variant="outlined"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleLogotipoImgChange}
        style={{ marginBottom: 16 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </Box>
  );
};

export {Create as ClientCreate};
