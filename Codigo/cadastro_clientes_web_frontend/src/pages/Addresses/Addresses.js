import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import showToastMessage from '../../components/Notify';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawerAppBar from '../../components/HamburgerMenu';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import {DataTableAddress} from '../../components/DataTable';
import {getAllAddresses, deleteAddress} from '../../services/AddressesActions';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import Layout from '../../shared/Layout';
import { ModalDelete } from '../../components/Modals';



const Addresses = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const colAddresses = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'clienteId', headerName: 'Client_ID', width: 70 },
        { field: 'rua', headerName: 'Street', width: 250 },
        { field: 'numero', headerName: 'Number', width: 70 },
        { field: 'bairro', headerName: 'Neighborhood', width: 110 },
        { field: 'cidade', headerName: 'City', width: 150 },
        { field: 'estado', headerName: 'State', width: 70 },
        { field: 'cep', headerName: 'Postal Code', width: 100 }
    ];

    const fetchAddresses = async (pgNumber, pgQt, orderby) => {
        try {
            const data = await getAllAddresses({ pageNumber: pgNumber, pageQuantity: pgQt, order: orderby });
            return(data);
        } catch (error) {
            console.error('Error fetching clients:', error);
            //showToastMessage('error', 'Failed to fetch clients.');
            return null;
        }
    };

    useEffect(() => {
        if (!props.loggedIn) {
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);


    return(
        <Layout>
            <div className='d-flex flex-row align-items-center mt-3'>
                <div className='col text-start'>
                    <Typography variant="h3" className='d-flex align-items-center'>
                        Addresses <PersonIcon sx={{ fontSize: 50 }} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        See all addresses
                    </Typography>
                </div>
                <div className='col text-end'>
                    <Button variant="contained" size="large" href="/clients/create"> 
                        <AddIcon /> New Address
                    </Button>
                </div>
            </div>

            <div className='container px-0 my-3 d-flex flex-column'>
                <DataTableAddress cols={colAddresses} fetchData = {fetchAddresses} deleteEntity = {deleteAddress} />
            </div>

        </Layout>
    );
};

export default Addresses;