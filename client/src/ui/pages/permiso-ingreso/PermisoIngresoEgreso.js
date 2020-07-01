import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlerts, setIsFetching } from '../../../api/actions/commonActions';
import { setAgenteValuesStart } from '../../../api/actions/agente/agenteActions';
import { TextField, Button, Icon, Radio, RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';
import { isDNI, isTelefono, isValidSubmitIngreso } from '../permisos/validation';
import AlertsList from '../alerts-list/AlertsList';
import Modal from '../../widgets/modal/TransitionsModal';
import useStyles from './permisoIngresoEgreso.style';


const PermisoIngresoEgreso = () => {
    const [userValues, setUserValues] = useState('');
    const [errorValues, setErrorValues] = useState({
        dni: '',
        telefono: '',
        cantidadPasajeros: false,
        acceso: false,
        residencia: false,
        registro: false,
        motivoViaje: false,
        destinoViaje: false,
        tiempoDestino: false,
        entraCuarentena: false,
    });
    const { isFetchingAgente, alerts, error, agente } = useSelector(state => state.agente);
    const { admin } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValidArray = [];
        //seteo error en input de permisoTipo y permiso
        setErrorValues({
            ...errorValues,
            cantidadPasajeros: !userValues.cantidadPasajeros,
            acceso: !userValues.acceso,
            residencia: !userValues.residencia,
            registro: !userValues.registro,
            motivoViaje: !userValues.motivoViaje,
            destinoViaje: !userValues.destinoViaje,
            tiempoDestino: !userValues.tiempoDestino,
            entraCuarentena: !userValues.entraCuarentena,
        });

        //seteo errores para la ventana modal 
        isValidArray = isValidSubmitIngreso(userValues);
        if (!isValidArray.length) {
            dispatch(setIsFetching(true));
            dispatch(setAgenteValuesStart(userValues));
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
        setUserValues({ ...userValues, [name]: value });
    };

    if (!agente && !admin) { return null }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {isFetchingAgente && <Modal />}
            {(error && !isFetchingAgente) && <Modal timeOut={6000} comentTitle='Error!' comentSubtitle={error} />}
            <span className={classes.title}>INGRESOS Y EGRESOS A LA CIUDAD</span>
            <span className={classes.subtitle}>* NOMBRE</span>
            <TextField
                variant="outlined"
                required
                name="nombre"
                className={classes.textfield}
                onChange={handleChange}
                value={userValues.nombre || ''}
                placeholder=" Nombre del conductor"
            />
            <span className={classes.subtitle}>* APELLIDO</span>
            <TextField
                variant="outlined"
                required
                name="apellido"
                value={userValues.apellido || ''}
                className={classes.textfield}
                onChange={handleChange}
                placeholder=" Apellido del conductor"
            />
            <span className={classes.subtitle}>* D.N.I </span>
            <TextField
                error={errorValues.dni ? true : false}
                helperText={errorValues.dni}
                variant="outlined"
                required
                name="dni"
                placeholder=" Dni del conductor"
                value={userValues.dni || ''}
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
            <span className={classes.subtitle}>* ACCESO</span>
            <div className={errorValues.acceso ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="acceso" value={userValues.acceso || ''} onChange={handleChange}>
                        <FormControlLabel value="Venancio Paz" control={<Radio color="primary" />} label="Venancio Paz" />
                        <FormControlLabel value="Presidente Perón Ruta 3" control={<Radio color="primary" />} label="Presidente Perón Ruta 3" />
                        <FormControlLabel value="Presidente Perón Ruta 30" control={<Radio color="primary" />} label="Presidente Perón Ruta 30" />
                        <FormControlLabel value="Alcides Segui" control={<Radio color="primary" />} label="Alcides Segui" />
                        <div className={classes.contentOtro} >
                            <FormControlLabel value="otroAcceso" control={<Radio color="primary" />} label="Otro:" />
                            <TextField
                                variant="outlined"
                                name="otroAcceso"
                                value={userValues.otroAcceso || ''}
                                className={classes.textfieldOtro}
                                onChange={handleChange}
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            <span className={classes.subtitle}>* RESIDENCIA</span>
            <div className={errorValues.residencia ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="residencia" value={userValues.residencia || ''} onChange={handleChange}>
                        <FormControlLabel value="Las Flores" control={<Radio color="primary" />} label="Las Flores" />
                        <FormControlLabel value="Saladillo" control={<Radio color="primary" />} label="Saladillo" />
                        <FormControlLabel value="Azul" control={<Radio color="primary" />} label="Azul" />
                        <FormControlLabel value="CABA" control={<Radio color="primary" />} label="CABA" />
                        <FormControlLabel value="La Plata" control={<Radio color="primary" />} label="La Plata" />
                        <FormControlLabel value="AMBA" control={<Radio color="primary" />} label="AMBA" />
                        <div className={classes.contentOtro} >
                            <FormControlLabel value="otroResidencia" control={<Radio color="primary" />} label="Otro:" />
                            <TextField
                                variant="outlined"
                                name="otroResidencia"
                                value={userValues.otroResidencia || ''}
                                className={classes.textfieldOtro}
                                onChange={handleChange}
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            <span className={classes.subtitle}>* DOMICILIO</span>
            <TextField
                variant="outlined"
                required
                name="domicilio"
                value={userValues.domicilio || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>* REGISTRO</span>
            <div className={errorValues.registro ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="registro" value={userValues.registro || ''} onChange={handleChange}>
                        <FormControlLabel value="Egreso" control={<Radio color="primary" />} label="Egreso" />
                        <FormControlLabel value="Ingreso" control={<Radio color="primary" />} label="Ingreso" />
                    </RadioGroup>
                </FormControl>
            </div>
            <span className={classes.subtitle}>* MOTIVO DEL VIAJE</span>
            <div className={errorValues.motivoViaje ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="motivoViaje" value={userValues.motivoViaje || ''} onChange={handleChange}>
                        <FormControlLabel value="Transportista" control={<Radio color="primary" />} label="Transportista" />
                        <FormControlLabel value="Personal de Salud" control={<Radio color="primary" />} label="Personal de Salud" />
                        <FormControlLabel value="Personal de Seguridad" control={<Radio color="primary" />} label="Personal de Seguridad" />
                        <FormControlLabel value="Actividad Rural" control={<Radio color="primary" />} label="Personal de Salud" />
                        <FormControlLabel value="Funcionario publico" control={<Radio color="primary" />} label="Funcionario publico" />
                        <div className={classes.contentOtro} >
                            <FormControlLabel value="otroMotivoViaje" control={<Radio color="primary" />} label="Otro:" />
                            <TextField
                                variant="outlined"
                                name="otroMotivoViaje"
                                value={userValues.otroMotivoViaje || ''}
                                className={classes.textfieldOtro}
                                onChange={handleChange}
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
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
            <span className={classes.subtitle}>* PATENTE VEHICULO</span>
            <TextField
                variant="outlined"
                required
                name="patente"
                value={userValues.patente || ''}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>* DESTINO DE VIAJE</span>
            <div className={errorValues.destinoViaje ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="destinoViaje" value={userValues.destinoViaje || ''} onChange={handleChange}>
                        <FormControlLabel value="Las Flores Parajes" control={<Radio color="primary" />} label="Las Flores Parajes" />
                        <FormControlLabel value="Saladillo" control={<Radio color="primary" />} label="Saladillo" />
                        <FormControlLabel value="Azul" control={<Radio color="primary" />} label="Azul" />
                        <FormControlLabel value="CABA" control={<Radio color="primary" />} label="CABA" />
                        <FormControlLabel value="La Plata" control={<Radio color="primary" />} label="La Plata" />
                        <FormControlLabel value="AMBA" control={<Radio color="primary" />} label="AMBA" />
                        <FormControlLabel value="Olavarria" control={<Radio color="primary" />} label="Olavarria" />
                        <div className={classes.contentOtro} >
                            <FormControlLabel value="otroDestinoViaje" control={<Radio color="primary" />} label="Otro:" />
                            <TextField
                                variant="outlined"
                                name="otroDestinoViaje"
                                value={userValues.otroDestinoViaje || ''}
                                className={classes.textfieldOtro}
                                onChange={handleChange}
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            <span className={classes.subtitle}>* TIEMPO EN DESTINO</span>
            <div className={errorValues.tiempoDestino ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="tiempoDestino" value={userValues.tiempoDestino || ''} onChange={handleChange}>
                        <FormControlLabel value="En el día" control={<Radio color="primary" />} label="En el día" />
                        <FormControlLabel value="24 - 48 hs" control={<Radio color="primary" />} label="24 - 48 hs" />
                        <FormControlLabel value="Mas de 48 hs" control={<Radio color="primary" />} label="Mas de 48 hs" />
                        <div className={classes.contentOtro} >
                            <FormControlLabel value="otroTiempoDestino" control={<Radio color="primary" />} label="Otro:" />
                            <TextField
                                variant="outlined"
                                name="otroTiempoDestino"
                                value={userValues.otroTiempoDestino || ''}
                                className={classes.textfieldOtro}
                                onChange={handleChange}
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            <span className={classes.subtitle}>* ¿ ENTRA EN CUARENTENA ?</span>
            <div className={errorValues.entraCuarentena ? classes.error : classes.errorContent}>
                <FormControl component="fieldset" className={classes.radioButtons}>
                    <RadioGroup aria-label="gender" name="entraCuarentena" value={userValues.entraCuarentena || ''} onChange={handleChange}>
                        <FormControlLabel value="si" control={<Radio color="primary" />} label="Si" />
                        <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            <span className={classes.subtitle}>OBSERVACIONES</span>
            <textarea
                name='observaciones'
                className={classes.textArea}
                onChange={handleChange}
                value={userValues.observaciones || ''}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                type='submit'
            >
                Enviar
            </Button>
            {alerts && <AlertsList alertas={alerts} />}
        </form>
    );
};

export default PermisoIngresoEgreso;