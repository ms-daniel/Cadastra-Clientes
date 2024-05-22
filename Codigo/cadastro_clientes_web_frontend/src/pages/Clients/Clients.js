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
import {DataTableClient} from '../../components/DataTable';
import {getAllClients, deleteClient} from '../../services/ClientActions';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import Layout from '../../shared/Layout';
import { ModalDelete } from '../../components/Modals';



const Clients = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const colClients = [
        { field: 'id', headerName: 'ID', width: 70 , flex: 1},
        { field: 'name', headerName: 'Name', width: 150, flex: 2 },
        { field: 'email', headerName: 'Email', width: 200, flex: 3},
        { field: 'addresses', headerName: 'Addresses', width: 90, flex: 1}
    ];

    const fetchClients = async (pgNumber, pgQt, orderby) => {
        const data = await getAllClients({ pageNumber: pgNumber, pageQuantity: pgQt, order: orderby })
        .then((response) => {
            return(response);
        })
        .catch((error)=> {
            showToastMessage(error.msgType, error.msg);
            if(error.error == 401){
                localStorage.removeItem('accessToken');
            }
            return null;
        });
        return data;
    };

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);


    return(
        <Layout>
            <div className='d-flex flex-md-row flex-sm-column flex-column align-items-start align-items-md-center mt-3'>
                <div className='col text-start'>
                    <Typography variant="h3" className='d-flex align-items-center'>
                        Clients <PersonIcon sx={{ fontSize: 50 }} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        See all clients
                    </Typography>
                </div>
                <div className='col text-end'>
                    <Button variant="contained" size="large" href="/clients/create"> 
                        <AddIcon /> New Client
                    </Button>
                </div>
            </div>

            <div className='container px-0 my-3 d-flex flex-column'>
                <DataTableClient cols={colClients} fetchData = {fetchClients} deleteEntity = {deleteClient} />
            </div>

        </Layout>
    );
};

export default Clients;