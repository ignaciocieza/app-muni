import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserAgenteStart } from '../../../api/actions/merge/mergeActions';
import TextField from '@material-ui/core/TextField';
import CodigoQr from '../../widgets/codigo-qr/CodigoQr';
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
        otroDestinoViaje, otroMotivoViaje, otroResidencia, otroTiempoDestino
    } = currentMerge ? currentMerge : '';

    console.dir(currentMerge)

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
            <CodigoQr qrData={qrData} className={classes.qrCode} />
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
            <span className={classes.subtitle}>TIPO DE PERMISO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={permisoTipo || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>DIRECCIÓN DE CORREO ELECTRÓNICO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={email || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>NOMBRE DEL COMERCIO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={nombreComercio || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>NÚMERO DE TELÉFONO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={numeroTelefono || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>D.N.I</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={dni || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>CANTIDAD PASAJEROS</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={cantidadPasajeros || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>D.N.I PASAJEROS</span>
            <textarea
                variant="outlined"
                className={classes.textArea}
                value={dniPasajeros || ''}
                readOnly="readonly"
            />
            <span className={classes.subtitle}>ACCESO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={otroAcceso !== "Sin especificar" ? otroAcceso : acceso}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>RESIDENCIA</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={otroResidencia !== "Sin especificar" ? otroResidencia : residencia}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>DOMICILIO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={domicilio || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>REGISTRO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={registro || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>MOTIVO DEL VIAJE</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={otroMotivoViaje !== "Sin especificar" ? otroMotivoViaje : motivoViaje}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>PATENTE VEHICULO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={patente || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>DESTINO DE VIAJE</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={otroDestinoViaje !== "Sin especificar" ? otroDestinoViaje : destinoViaje}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>TIEMPO EN DESTINO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={otroTiempoDestino !== "Sin especificar" ? otroTiempoDestino : tiempoDestino}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>¿ ENTRA EN CUARENTENA ?</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={entraCuarentena || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>OBSERVACIONES DEL AGENTE DE TRÁNSITO</span>
            <textarea
                variant="outlined"
                className={classes.textArea}
                value={observaciones || ''}
                readOnly="readonly"
            />
            {admin && (
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
            )}
            <span className={classes.subtitle}>COMENTARIO DEL PERMISO DE CIRCULACION</span>
            <textarea
                variant="outlined"
                className={classes.textArea}
                value={comentario || ''}
                readOnly="readonly"
            />
            {((image) && (image !== 'Sin especificar')) && (
                <div className={classes.imagenContein}>
                    <img src={image} alt='No imagen' className={classes.imagen} />
                </div>
            )}
        </div >
    )
};

export default DetailPage;