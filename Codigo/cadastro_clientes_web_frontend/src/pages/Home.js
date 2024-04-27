import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import showToastMessage from '../components/Notify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import DataTable from '../components/DataTable'
import {ToastContainer} from "react-toastify";
import {getClients} from '../services/Api'
import Button from '@mui/material/Button';
import Layout from '../shared/Layout';



const Home = (props) => {
    const navigate = useNavigate();

    const colClients = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 }
    ];

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients({ pageNumber: 1, pageQuantity: 5 });
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                //showToastMessage('error', 'Failed to fetch clients.');
            }
        };

        if (props.loggedIn) {
            fetchClients();
        } else {
            navigate('/login');
        }
    }, [props.loggedIn, navigate]);


    return(
        <Layout>
            <div className='row  mt-3'>
                <Typography variant="h3" className='d-flex align-items-center'>
                    Home <HomeIcon sx={{ fontSize: 50 }} />
                </Typography>
            </div>

            <Divider flexItem sx={{borderColor: 'black'}}/>

            <div className='container px-0 my-3 d-flex flex-column'>
                <div className='d-flex flex-row align-items-center'>
                    <div className='col text-start'>
                        <Typography variant="h5" ml={0}>
                            <b>Clients</b>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            See the last 5 clients
                        </Typography>
                    </div>
                    <div className='col text-end'>
                        <Button variant="contained" size="large" href="#">See All</Button>
                    </div>
                </div>

                <DataTable cols={colClients} rows={clients} />
            </div>

            <Divider flexItem sx={{borderColor: 'black'}}/>

            <Box sx={{ textAlign: 'left' }} className='container px-0 my-3'>
                <Typography variant="h5">
                    <b>Addresses</b>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    See the last 5 addresses
                </Typography>
            </Box>
            <ToastContainer />
        </Layout>
    );
};

export default Home;