import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Icon, MenuItem, Select, FormControl } from '@material-ui/core';
import ImagePicker from '../../widgets/image-picker/ImagePicker';
import { setUser, setIsFetchingUser } from '../../../api/actions/indexAction';
import Modal from '../../widgets/modal/TransitionsModal';
import { isDNI } from './validation';
import useStyles from './permisoCirculacion.style';

const PermisoCirculacion = () => {
    const [userValues, setUserValues] = useState({ nombre: '', apellido: '', dni: '', numeroControl: '', comentario: '', permiso: '' });
    //const [permisoSelect, setPermisoSelect] = useState('');
    const [errorValue, setErrorValue] = useState('');
    const { currentImage, currentUser, admin, isFetching, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (currentUser) {
            setUserValues({
                nombre: currentUser.nombre,
                apellido: currentUser.apellido,
                dni: currentUser.dni,
                comentario: currentUser.comentario,
                numeroControl: currentUser.numeroControl,
                permiso: currentUser.permiso,
            });
        }
    }, [currentUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = !isDNI(userValues.dni);

        if (isValid) {
            dispatch(setIsFetchingUser(true));

            if (admin) {
                //dispatch(setUser({ ...userValues, permiso: permisoSelect ? permisoSelect : userValues.permiso, image: currentImage }, !!currentUser));
                dispatch(setUser({ ...userValues, image: currentImage }, !!currentUser));
            } else {
                dispatch(setUser({ ...userValues, permiso: 'PENDIENTE', image: currentImage }));
            }
        }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        if (name === 'dni') {
            setErrorValue(isDNI(value));
        }

        setUserValues({ ...userValues, [name]: value });
    };

    // const selectChange = (event) => {
    //     setPermisoSelect(event.target.value)
    // };
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {isFetching && <Modal />}
            {error && <Modal timeOut={6000} comentTitle='Error!' comentSubtitle={error} />}
            <span className={classes.title}>FORMULARIO DE CIRCULACIÓN</span>
            <span className={classes.subtitle}>NOMBRE</span>
            <TextField
                variant="outlined"
                required
                name="nombre"
                className={classes.textfield}
                onChange={handleChange}
                value={userValues.nombre || ''}
            />
            <span className={classes.subtitle}>APELLIDO</span>
            <TextField
                variant="outlined"
                required
                name="apellido"
                value={userValues.apellido || ''}
                className={classes.textfield}
                onChange={handleChange} />
            {admin && (
                <React.Fragment>
                    <span className={classes.subtitle}>PERMISO</span>
                    <FormControl variant="outlined" required className={classes.formControl}>
                        <Select
                            //value={(permisoSelect || userValues.permiso === 'PENDIENTE') ? permisoSelect : userValues.permiso}
                            value={userValues.permiso || ''}
                            name='permiso'
                            //onChange={selectChange}
                            onChange={handleChange}
                        >
                            <MenuItem value={'PERMITIDO'}>PERMITIDO</MenuItem>
                            <MenuItem value={'DENEGADO'}>DENEGADO</MenuItem>
                        </Select>
                    </FormControl>
                </React.Fragment>
            )}
            <span className={classes.subtitle}>D.N.I</span>
            <TextField
                error={errorValue ? true : false}
                helperText={errorValue}
                variant="outlined"
                required
                name="dni"
                value={userValues.dni || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            {admin && (
                <React.Fragment>
                    <span className={classes.subtitle}>NRO DE CONTROL INTERNO</span>
                    <TextField
                        variant="outlined"
                        required
                        name="numeroControl"
                        value={userValues.numeroControl || ''}
                        className={classes.textfield}
                        onChange={handleChange} />
                </React.Fragment>
            )}
            <ImagePicker title='ADJUNTAR IMAGEN' />
            <span className={classes.subtitle}>COMENTARIOS</span>
            <textarea
                name='comentario'
                className={classes.textArea}
                placeholder='Escriba sus comentarios de permiso'
                onChange={handleChange}
                value={userValues.comentario || ''}
                required
            />
            {admin ?
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    type='submit'
                >
                    Generar QR
                </Button> :
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    type='submit'
                >
                    Enviar
                </Button>
            }
        </form>
    );
};

export default PermisoCirculacion;