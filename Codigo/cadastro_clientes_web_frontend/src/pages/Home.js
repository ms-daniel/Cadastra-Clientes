import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import showToastMessage from '../components/Notify';
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawerAppBar from '../components/HamburgerMenu';

const Home = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        /*if (!props.loggedIn) {
            navigate('/login');
        }*/
    }, [props.loggedIn, navigate]);

    return(
        <>
            <DrawerAppBar />
            {props.loggedIn ? (<p>Logado porra</p>) : (<p>loga aí mano </p>)}
            <p>Home</p>
        </>
    );
};

export default Home;