import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserStart } from '../../../api/actions/user/userActions';
import { setAlerts, setIsFetching } from '../../../api/actions/commonActions'
import ImagePicker from '../../widgets/image-picker/ImagePicker';
import Modal from '../../widgets/modal/TransitionsModal';
import AlertsList from '../alerts-list/AlertsList';
import { isDNI, isTelefono, isMail, isValidSubmitCirculacion } from '../permisos/validation';
import { TextField, Button, Icon, MenuItem, Select, FormControl } from '@material-ui/core';
import useStyles from './permisoCirculacion.style';

const PermisoCirculacion = () => {
    const [userValues, setUserValues] = useState('')
    const [errorValues, setErrorValues] = useState({ dni: '', telefono: '', email: '', permisoTipo: false, permiso: false });
    const { currentImage, admin, isFetching, alerts, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    /**
     * Funcion Geolocalizacion
     * https://medium.com/swlh/how-to-add-geolocation-to-a-react-app-af2d55a8b5e3
     * https://www.youtube.com/watch?v=U3dLjHN0UvM
     * https://www.youtube.com/watch?v=Pf7g32CwX_s
     * https://developers.google.com/maps/documentation/urls/guide
     */
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position)=>{
    //         //console.dir(position);
    //         console.log(position.coords.latitude, position.coords.longitude);
    //         //https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    //         //https://www.google.com/maps/dir/?api=1&query=-36.0199936, -59.0927072
    //     });
    // }


    const handleSubmit = (event) => {
        event.preventDefault();
        let isValidArray = [];
        //seteo error en input de permisoTipo y permiso
        setErrorValues({ ...errorValues, permisoTipo: !userValues.permisoTipo, permiso: (!userValues.permiso || userValues.permiso === 'PENDIENTE') });
        //seteo errores para la ventana modal 
        isValidArray = isValidSubmitCirculacion(userValues, !!currentImage, admin);
        if (!isValidArray.length) {
            dispatch(setIsFetching(true));
            if (admin) {
                //dispatch(setUserStart({ ...userValues, image: currentImage, currentUser: !!currentUser }));
                dispatch(setUserStart({ ...userValues, image: currentImage }));
            } else {
                dispatch(setUserStart({ ...userValues, permiso: 'PENDIENTE', image: currentImage }));
            }
        } else {
            dispatch(setAlerts(isValidArray));
        }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        if (name === 'dni') {
            setErrorValues({ ...errorValues, dni: isDNI(value) });
        }
        if (name === 'numeroTelefono') {
            setErrorValues({ ...errorValues, telefono: isTelefono(value) });
        }
        if (name === 'email') {
            setErrorValues({ ...errorValues, email: isMail(value) });
        }
        setUserValues({ ...userValues, [name]: value });
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
            {isFetching && <Modal />}
            {(error && !isFetching) && <Modal timeOut={6000} comentTitle='Error!' comentSubtitle={error} />}
            <span className={classes.title}>FORMULARIO DE PERMISOS</span>
            <span className={classes.subtitle}>* NOMBRE</span>
            <TextField
                variant="outlined"
                required
                name="nombre"
                className={classes.textfield}
                onChange={handleChange}
                value={userValues.nombre || ''}
            />
            <span className={classes.subtitle}>* APELLIDO</span>
            <TextField
                variant="outlined"
                required
                name="apellido"
                value={userValues.apellido || ''}
                className={classes.textfield}
                onChange={handleChange} />
            {admin && (
                <React.Fragment>
                    <span className={classes.subtitle}>* PERMISO</span>
                    <FormControl variant="outlined" error={errorValues.permiso} className={classes.formControl}>
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
            <span className={classes.subtitle}>* TIPO DE PERMISO</span>
            <FormControl variant="outlined" error={errorValues.permisoTipo} className={classes.formControl}>
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
            <span className={classes.subtitle}>* D.N.I</span>
            <TextField
                error={errorValues.dni ? true : false}
                helperText={errorValues.dni}
                variant="outlined"
                required
                name="dni"
                value={userValues.dni || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>* DIRECCIÓN DE CORREO ELECTRÓNICO</span>
            <TextField
                error={errorValues.email ? true : false}
                helperText={errorValues.email}
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
            <span className={classes.subtitle}>* NÚMERO DE TELÉFONO</span>
            <TextField
                error={errorValues.telefono ? true : false}
                helperText={errorValues.telefono}
                variant="outlined"
                required
                name="numeroTelefono"
                type='tel'
                value={userValues.numeroTelefono || ''}
                className={classes.textfield}
                onChange={handleChange}
                placeholder="Whatsapp: CODIGO DE AREA + NUMERO (TOTAL 10 NUMEROS)"
            />
            {/* {admin && (
                    <React.Fragment>
                        <span className={classes.subtitle}>* NRO DE CONTROL INTERNO</span>
                        <TextField
                            variant="outlined"
                            required
                            name="numeroControl"
                            value={userValues.numeroControl || ''}
                            className={classes.textfield}
                            onChange={handleChange} />
                    </React.Fragment>
                )} */}
            <ImagePicker title='* ADJUNTAR IMAGEN DEL FRENTE DEL DNI' />
            <span className={classes.subtitle}>* MOTIVO DE SOLICITUD DE PERMISO</span>
            <textarea
                name='comentario'
                className={classes.textArea}
                placeholder='Detalle el motivo de su solicitud...'
                onChange={handleChange}
                value={userValues.comentario || ''}
                required
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                type='submit'
            >
                {admin ? 'Generar QR' : 'Enviar'}
            </Button>
            {alerts && <AlertsList alertas={alerts} />}
        </form>
    );
};

export default PermisoCirculacion;