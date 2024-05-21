import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { getClient } from '../../services/ClientActions';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import Layout from '../../shared/Layout';
import { ModalDelete } from '../../components/Modals';



const Addresses = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [clientName, setClientName] = useState('');

    const { id } = useParams();

    const colAddresses = [
        { field: 'id', headerName: 'ID', width: 70 },
        { 
            field: 'clienteId', 
            headerName: 'Client_ID', 
            width: 70,
            cellClassName: 'd-flex justify-content-center',
            renderCell: (params) => (
                <Button
                    href={'/addresses/' + params.row.clienteId}
                    sx={{ color: blue['A700'] }} 
                >
                    {params.row.clienteId}
                </Button>
            )
        },
        { field: 'rua', headerName: 'Street', width: 250 },
        { field: 'numero', headerName: 'Number', width: 70 },
        { field: 'bairro', headerName: 'Neighborhood', width: 110 },
        { field: 'cidade', headerName: 'City', width: 150 },
        { field: 'estado', headerName: 'State', width: 70 },
        { field: 'cep', headerName: 'Postal Code', width: 100 }
    ];

    const fetchAddresses = async (pgNumber, pgQt, orderby) => {
        try {
            const data = await getAllAddresses({ pageNumber: pgNumber, pageQuantity: pgQt, order: orderby , clientId: id});
            return(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
            return null;
        }
    };

    const fetchClient = async () => {
        try {
            await getClient(id)
            .then((response) => {
                setClientName(response.name);
            });
        } catch (error) {
        }
    };

    useEffect(() => {
        if (!props.loggedIn) {
            navigate('/login');
        }
        if(id != null){
            fetchClient();
        }
    }, [props.loggedIn, navigate]);


    return(
        <Layout>
            <div className='d-flex flex-md-row flex-sm-column flex-column align-items-start align-items-md-center mt-3'>
                <div className='col text-start'>
                    <Typography variant="h3" className='d-flex align-items-center'>
                        Addresses <PersonIcon sx={{ fontSize: 50 }} />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        See all addresses {id && <span>for <b>{clientName}</b></span>}
                    </Typography>
                </div>
                <div className='col text-end'>
                    { 
                        id == null ? 
                            <Tooltip title="Click on a client ID">
                                <Button variant="contained" size="large"> 
                                    New Address ?
                                </Button>
                            </Tooltip>
                            :
                            <Button variant="contained" size="large" href={"/addresses/create/" + id}> 
                                <AddIcon /> New Address
                            </Button>
                    }
                </div>
            </div>

            <div className='container px-0 my-3 d-flex flex-column'>
                <DataTableAddress cols={colAddresses} fetchData = {fetchAddresses} deleteEntity = {deleteAddress}/>
            </div>

        </Layout>
    );
};

export default Addresses;