import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const UsernameField = ({usernameValue, setFunction}) => {
    //const [username, setUsername] = useState('desafio');

    const handleUsername = (event) => {
        const newValue = event.target.value;
        setFunction(newValue);
    }

    return(
        <>
            <Box
            sx={{
                width: 400,
                maxWidth: '100%',
            }}
            >
                <TextField
                    id="filled-basic"
                    label="Username"
                    fullWidth 
                    variant="filled" 
                    value={usernameValue}
                    onChange={handleUsername}
                />
            </Box>
        </>
    );
};

const PasswordField = ({passwordValue, setFunction}) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePassword = (event) => {
        const newValue = event.target.value;
        setFunction(newValue);
    }

    return (
        <FormControl sx={{ m: 1, width: '400px' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            value= {passwordValue}
            onChange={handlePassword}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
    );
};

export {UsernameField, PasswordField};