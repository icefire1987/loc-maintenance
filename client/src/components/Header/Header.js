import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

import logo from '../../assets/aprixon_logo.png';
import './Header.scss';

const Header = () => (
    <AppBar position="static" color="default">
        <Toolbar className="Header">
            <img src={logo} className="Header-logo" alt="logo" />
            <Typography className="Header-title" variant="h4" noWrap>
                Wartungsübersicht
            </Typography>
        </Toolbar>
    </AppBar>
);

export default Header;
