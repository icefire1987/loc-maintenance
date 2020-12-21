import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { lightBlue } from '@material-ui/core/colors';
import App from './App';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        type: 'dark',
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
