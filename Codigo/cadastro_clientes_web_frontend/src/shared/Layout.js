// Layout.js
import React from 'react';
import DrawerAppBar from '../components/HamburgerMenu';
import Toolbar from '@mui/material/Toolbar';

const Layout = ({ children }) => {
  return (
    <div className='container flex'>
        
        <div className='row'>
            <DrawerAppBar />
            <Toolbar />
        </div>
        {children}
    </div>
  );
};

export default Layout;
