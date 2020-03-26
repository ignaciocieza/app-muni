import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {resetCurrents} from '../../api/actions/indexAction';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import useStyles from './header.styles';

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" className={classes.title} onClick={()=>dispatch(resetCurrents())} component={Link} to="/admin">Administrar</Button>
                <Button color="inherit" className={classes.title} onClick={()=>dispatch(resetCurrents())} component={Link} to="/generar">Generar Permiso</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;