import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserAgenteStart } from '../../../api/actions/merge/mergeActions';
import CodigoQr from '../../widgets/codigo-qr/CodigoQr';
import { sinEspecificar } from '../../../constants';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField, Grid } from '@material-ui/core';
import useStyles from './detailPage.styles';

let flag = true;

const DetailPage = ({ match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.user);
    const { currentMerge } = useSelector(state => state.merge);
    const {
        permiso, qrData, nombre, apellido, dni, numeroControl,
        comentario, image, permisoTipo, nombreComercio, domicilio,
        numeroTelefono, email, cantidadPasajeros, dniPasajeros, acceso,
        residencia, registro, motivoViaje, patente, destinoViaje,
        tiempoDestino, entraCuarentena, observaciones, otroAcceso,
        otroDestinoViaje, otroMotivoViaje, otroResidencia, otroTiempoDestino,
        fechaPesca, lugarPesca
    } = currentMerge ? currentMerge : '';

    useEffect(() => {
        if (flag) {
            if (!admin || !currentMerge) {
                flag = false;
                dispatch(fetchUserAgenteStart(match.params.id));
            }
        }
        window.scrollTo(0, 0);
    }, [dispatch, match, admin, currentMerge]);

    if (!currentMerge) { return null };

    return (
        <div className={classes.root}>
            <span className={classes.title}>
                ESTADO DEL PERMISO:
                &nbsp;
                <span className={permiso === 'PERMITIDO' ? classes.subtitlePermitido : classes.subtitleDenegado}>
                    {permiso}
                </span>
            </span>
            <div className={classes.qrCode}>
                <CodigoQr qrData={qrData} />
            </div>
            <span className={classes.subtitle}>NOMBRE</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={nombre || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>APELLIDO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={apellido || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            {(permisoTipo && (permisoTipo !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>TIPO DE PERMISO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={permisoTipo || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(email && (email !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>DIRECCIÓN DE CORREO ELECTRÓNICO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={email || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>)}
            {(nombreComercio && (nombreComercio !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>NOMBRE DEL COMERCIO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={nombreComercio || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(numeroTelefono && (numeroTelefono !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>NÚMERO DE TELÉFONO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={numeroTelefono || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>)}
            <span className={classes.subtitle}>D.N.I</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={dni || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            {(cantidadPasajeros && (cantidadPasajeros !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>CANTIDAD PASAJEROS</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={cantidadPasajeros || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(lugarPesca && (lugarPesca !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>LUGAR DE PESCA</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={lugarPesca || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(fechaPesca && (fechaPesca !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>FECHA DE PESCA</span>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around" >
                            <KeyboardDatePicker
                                disableToolbar
                                // variant="inline"
                                variant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                //label="Fecha del Día de la Pesca"
                                readOnly={true}
                                name='fechaPesca'
                                value={fechaPesca || ""}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.fecha}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </>
            )}
            {(dniPasajeros && (dniPasajeros !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>D.N.I PASAJEROS</span>
                    <textarea
                        variant="outlined"
                        className={classes.textArea}
                        value={dniPasajeros || ''}
                        readOnly="readonly"
                    />
                </>
            )}
            {(acceso && (acceso !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>ACCESO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={otroAcceso !== sinEspecificar
                            ? otroAcceso : acceso}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>)}
            {(residencia && (residencia !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>RESIDENCIA</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={otroResidencia !== sinEspecificar
                            ? otroResidencia : residencia}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>)}
            {(domicilio && (domicilio !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>DOMICILIO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={domicilio || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>)}
            {(registro && (registro !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>REGISTRO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={registro || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>)}
            {(motivoViaje && (motivoViaje !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>MOTIVO DEL VIAJE</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={otroMotivoViaje !== sinEspecificar
                            ? otroMotivoViaje : motivoViaje}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(patente && (patente !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>PATENTE VEHICULO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={patente || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>)}
            {(destinoViaje && (destinoViaje !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>DESTINO DE VIAJE</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={otroDestinoViaje !== sinEspecificar
                            ? otroDestinoViaje : destinoViaje}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(tiempoDestino && (tiempoDestino !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>TIEMPO EN DESTINO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={otroTiempoDestino !== sinEspecificar
                            ? otroTiempoDestino : tiempoDestino}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(entraCuarentena && (entraCuarentena !== 'n')) && (
                <>
                    <span className={classes.subtitle}>¿ ENTRA EN CUARENTENA ?</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={entraCuarentena || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
            )}
            {(observaciones && (observaciones !== sinEspecificar)) && (
                <>
                    <span className={classes.subtitle}>OBSERVACIONES DEL AGENTE DE TRÁNSITO</span>
                    <textarea
                        variant="outlined"
                        className={classes.textArea}
                        value={observaciones || ''}
                        readOnly="readonly"
                    />
                </>)}
            {(admin && numeroControl) && (
                <React.Fragment>
                    <span className={classes.subtitle}>NRO DE CONTROL INTERNO</span>
                    <TextField
                        className={classes.textfield}
                        variant="outlined"
                        value={numeroControl || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </React.Fragment>
            )
            }
            {comentario && (
                <>
                    <span className={classes.subtitle}>COMENTARIO DEL PERMISO DE CIRCULACION</span>
                    <textarea
                        variant="outlined"
                        className={classes.textArea}
                        value={comentario || ''}
                        readOnly="readonly"
                    />
                </>
            )}
            {
                ((image) && (image !== sinEspecificar
                )) && (
                    <div className={classes.imagenContein}>
                        <img src={image} alt='No imagen' className={classes.imagen} />
                    </div>
                )
            }
        </div >
    )
};

export default DetailPage;