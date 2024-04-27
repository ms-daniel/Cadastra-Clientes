import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import DataTable from '../../components/DataTable'
import {ToastContainer} from "react-toastify";
import {getClients} from '../../services/Api'
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';



const Clients = (props) => {
    const navigate = useNavigate();

    const colClients = [
        { field: 'id', headerName: 'ID', width: 70 , flex: 1},
        { field: 'name', headerName: 'Name', width: 150, flex: 2 },
        { field: 'email', headerName: 'Email', width: 200, flex: 3},
        { field: 'addresses', headerName: 'Addresses', width: 90, flex: 1},
        { 
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            flex: 2 ,
            sortable: false,
            renderCell: (params) => (
            <div>
                <IconButton
                aria-label="edit"
                onClick={() => handleEdit(params.row.id)}
                sx={{ color: blue['A700'] }} 
                >
                <EditIcon />
                </IconButton>
                <IconButton
                aria-label="delete"
                onClick={() => handleDelete(params.row.id)}
                sx={{ color: red['A700'] }}
                >
                <DeleteIcon />
                </IconButton>
            </div>
            ),
        }
    ];

    const [clients, setClients] = useState([]);

    const handleEdit = (id) => {
        console.log('Editar item com ID:', id);
      };
    
      const handleDelete = (id) => {
        console.log('Excluir item com ID:', id);
      };

    useEffect(() => {
        const fetchclients = async () => {
            try {
                const data = await getClients({ pageNumber: 1, pageQuantity: 5 });
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                //showToastMessage('error', 'Failed to fetch clients.');
            }
        };

        if (props.loggedIn) {
            fetchclients();
        } else {
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);


    return(
        <div className='container flex'>
            <div className='row'>
                <DrawerAppBar />
                <Toolbar />
            </div>

            <div className='d-flex flex-row align-items-center mt-3'>
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
                

                <DataTable cols={colClients} rows={clients} />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Clients;