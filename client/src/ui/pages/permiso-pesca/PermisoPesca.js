import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPescaValuesStart } from '../../../api/actions/pesca/pescaActions';
import { setAlerts, setIsFetching, setIsHeader } from '../../../api/actions/commonActions'
import ImagePicker from '../../widgets/image-picker/ImagePicker';
import Modal from '../../widgets/modal/TransitionsModal';
import AlertsList from '../alerts-list/AlertsList';
import { isDNI, isTelefono, isMail, isValidSubmitCirculacion, isValidSubmitPesca } from '../permisos/validation';
import { TextField, Button, Icon, Radio, RadioGroup, FormControlLabel, FormControl, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from './permisoPesca.style';


const PermisoCirculacion = () => {
    const [userValues, setUserValues] = useState('');
    const [errorValues, setErrorValues] = useState({ dni: '', telefono: '', email: '', permisoTipo: false, permiso: false });
    const { currentImage, admin, isFetching, alerts, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    let isErrorFecha=false;
    const classes = useStyles();

    useEffect(() => { dispatch(setIsHeader(true)) }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValidArray = [];
        //seteo error sobre el input
        setErrorValues({ ...errorValues, cantidadPasajeros: !userValues.cantidadPasajeros });
        //seteo errores para las alerts 
        isValidArray = [...isValidSubmitCirculacion(userValues, !!currentImage, null, true), ...isValidSubmitPesca(userValues)];
        if (!isValidArray.length && !isErrorFecha) {
            dispatch(setIsFetching(true));
            dispatch(setPescaValuesStart({ ...userValues, image: currentImage, isRedirect: true }));
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
            <span className={classes.title}>FORMULARIO DE PESCA</span>
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
            <span className={classes.subtitle}>* LUGAR </span>
            <TextField
                variant="outlined"
                placeholder="Especifique el lugar de la Pesca"
                required
                name="lugarPesca"
                value={userValues.lugarPesca || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>* FECHA </span>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <Grid container justify="space-around" >
                    <KeyboardDatePicker
                        disableToolbar
                        // variant="inline"
                        variant="outlined"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        //label="Fecha del Día de la Pesca"
                        disablePast={true}
                        name='fechaPesca'
                        invalidDateMessage='Formato de la Fecha Inválido'
                        invalidLabel='Ingrese el día de la pesca'
                        value={userValues.fechaPesca || ""}
                        onChange={(e) => setUserValues({ ...userValues, fechaPesca: e })}
                        onError={(e) =>{ isErrorFecha=e}}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={classes.fecha}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <span className={classes.subtitle}>* PATENTE VEHICULO</span>
            <TextField
                variant="outlined"
                required
                name="patente"
                value={userValues.patente || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>* CANTIDAD PASAJEROS</span>
            <div className={errorValues.cantidadPasajeros ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="cantidadPasajeros" value={userValues.cantidadPasajeros || ''} onChange={handleChange}>
                        <FormControlLabel value="1" control={<Radio color="primary" />} label="1" />
                        <FormControlLabel value="2" control={<Radio color="primary" />} label="2" />
                        <FormControlLabel value="3" control={<Radio color="primary" />} label="3" />
                    </RadioGroup>
                </FormControl>
            </div>
            <span className={classes.subtitle}>D.N.I PASAJEROS</span>
            <textarea
                name='dniPasajeros'
                className={classes.textArea}
                placeholder='Listar el Nombre Completo y DNI de los pasajeros'
                onChange={handleChange}
                value={userValues.dniPasajeros || ''}
            />
            <span className={classes.subtitle}>* DOMICILIO</span>
            <TextField
                variant="outlined"
                required
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