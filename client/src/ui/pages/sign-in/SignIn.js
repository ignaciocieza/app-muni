import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAdmin } from '../../../api/actions/indexAction';
import { TextField, Button } from '@material-ui/core';
import imageLogo from '../../../assets/gob-municipal-abajo.png';
import useStyles from './signIn.styles';

export default function SignIn() {
    const [adminValue, setAdminValue] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setAdmin(adminValue))
        history.push('/home');
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setAdminValue({ ...adminValue, [name]: value });
    };

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.contentField}>
                    <div className={classes.imageContent}>
                        <img className={classes.image} src={imageLogo} alt='no imagen' />
                    </div>
                    <TextField
                        type="email"
                        name='email'
                        variant="filled"
                        className={classes.textField}
                        required
                        label="Email"
                        onChange={handleChange} />
                    <TextField
                        className={classes.textField}
                        variant="filled"
                        name='password'
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        required
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type='submit'
                    >
                        Sign In
                </Button>
                </div>
            </form>
            <div className={classes.rightSideContent}>
                <div className={classes.square}>
                    <span className={classes.squareTitle}>GESTIÓN DE CONTROL DE PERMISO</span>
                </div>
            </div>
        </div>
    )
}