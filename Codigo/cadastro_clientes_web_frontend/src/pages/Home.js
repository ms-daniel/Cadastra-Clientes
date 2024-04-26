import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import showToastMessage from '../components/Notify';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawerAppBar from '../components/HamburgerMenu';
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


const Home = (props) => {
    const navigate = useNavigate()

    const style = {
        borderColor: 'black',
      };

    useEffect(() => {
        /*if (!props.loggedIn) {
            navigate('/login');
        }*/
    }, [props.loggedIn, navigate]);

    return(
        <div className='container flex'>
            <div className='row'>
                <DrawerAppBar />
                <Toolbar />
            </div>
            <div className='row'>
                <Typography variant="h3" className='d-flex align-items-center'>
                    Home <HomeIcon sx={{ fontSize: 50 }} />
                </Typography>
            </div>

            <Divider flexItem sx={{borderColor: 'black'}}/>

            <Box sx={{ textAlign: 'left' }} className='container px-0 my-3'>
                <Typography variant="h5">
                    <b>Customers</b>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    See the last 5 customers
                </Typography>

                <DataTable />
            </Box>

            <Divider flexItem sx={{borderColor: 'black'}}/>

            <Box sx={{ textAlign: 'left' }} className='container px-0 my-3'>
                <Typography variant="h5">
                    <b>Adresses</b>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    See the last 5 adresses
                </Typography>
            </Box>

        </div>
    );
};

export default Home;