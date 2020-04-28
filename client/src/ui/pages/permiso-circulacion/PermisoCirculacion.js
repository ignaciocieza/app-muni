import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Icon, MenuItem, Select, FormControl } from '@material-ui/core';
import ImagePicker from '../../widgets/image-picker/ImagePicker';
import { setUser, setIsFetchingUser } from '../../../api/actions/indexAction';
import Modal from '../../widgets/modal/TransitionsModal';
import { isDNI, isTelefono } from './validation';
import useStyles from './permisoCirculacion.style';

const PermisoCirculacion = () => {
    const [userValues, setUserValues] = useState({ nombre: '', apellido: '', dni: '', numeroControl: '', comentario: '', permiso: '' });
    //const [permisoSelect, setPermisoSelect] = useState('');
    const [errorValue, setErrorValue] = useState({ dni: '', telefono: '' });
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
                permisoTipo: currentUser.permisoTipo,
                email:currentUser.email ,
                nombreComercio:currentUser.nombreComercio,
                domicilio:currentUser.domicilio,
                numeroTelefono:currentUser.numeroTelefono,
            });
        }
    }, [currentUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = (!isDNI(userValues.dni) && !isTelefono(userValues.numeroTelefono));

        if (isValid) {
            dispatch(setIsFetchingUser(true));

            if (admin) {
                dispatch(setUser({ ...userValues, image: currentImage }, !!currentUser));
            } else {
                dispatch(setUser({ ...userValues, permiso: 'PENDIENTE', image: currentImage }));
            }
            //console.dir(userValues);
        }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        if (name === 'dni') {
            setErrorValue({ ...errorValue, dni: isDNI(value) });
        }
        if (name === 'numeroTelefono') {
            setErrorValue({ ...errorValue, telefono: isTelefono(value) });
        }
        setUserValues({ ...userValues, [name]: value });
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {isFetching && <Modal />}
            {error && <Modal timeOut={6000} comentTitle='Error!' comentSubtitle={error} />}
            <span className={classes.title}>FORMULARIO DE PERMISOS</span>
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
                            value={userValues.permiso || ''}
                            name='permiso'
                            onChange={handleChange}
                        >
                            <MenuItem value={'PERMITIDO'}>PERMITIDO</MenuItem>
                            <MenuItem value={'DENEGADO'}>DENEGADO</MenuItem>
                        </Select>
                    </FormControl>
                </React.Fragment>
            )}
            <span className={classes.subtitle}>TIPO DE PERMISO</span>
            <FormControl variant="outlined" required className={classes.formControl}>
                <Select
                    value={userValues.permisoTipo || ''}
                    name='permisoTipo'
                    onChange={handleChange}
                >
                    <MenuItem value={'CIRCULACION'}>CIRCULACIÓN</MenuItem>
                    <MenuItem value={'DELIVERY'}>DELIVERY</MenuItem>
                    <MenuItem value={'VOLUNTARIOS'}>VOLUNTARIOS</MenuItem>
                </Select>
            </FormControl>
            <span className={classes.subtitle}>D.N.I</span>
            <TextField
                error={errorValue.dni ? true : false}
                helperText={errorValue.dni}
                variant="outlined"
                required
                name="dni"
                value={userValues.dni || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>DIRECCIÓN DE CORREO ELECTRÓNICO</span>
            <TextField
                variant="outlined"
                required
                name="email"
                type="email"
                value={userValues.email || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>NOMBRE DEL COMERCIO</span>
            <TextField
                variant="outlined"
                //required
                name="nombreComercio"
                value={userValues.nombreComercio || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>DOMICILIO</span>
            <TextField
                variant="outlined"
                //required
                name="domicilio"
                value={userValues.domicilio || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>NÚMERO DE TELÉFONO</span>
            <TextField
                error={errorValue.telefono ? true : false}
                helperText={errorValue.telefono}
                variant="outlined"
                required
                name="numeroTelefono"
                type='tel'
                value={userValues.numeroTelefono || ''}
                className={classes.textfield}
                onChange={handleChange}
                placeholder="* Whatsapp: CODIGO DE AREA + NUMERO (TOTAL 10 NUMEROS)"
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
            <ImagePicker title='ADJUNTAR IMAGEN DEL FRENTE DEL DNI' />
            <span className={classes.subtitle}>MOTIVO DE SOLICITUD DE PERMISO</span>
            <textarea
                name='comentario'
                className={classes.textArea}
                placeholder='Detalle el motivo de su solicitud...'
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