import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../../api/actions/indexAction';
import TextField from '@material-ui/core/TextField';
import CodigoQr from '../../widgets/codigo-qr/CodigoQr';
import useStyles from './detailPage.styles';

const DetailPage = ({ match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {dispatch(fetchUser(match.params.id))}, [match, dispatch]);
    const {currentUser} = useSelector(state => state);

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>
                Estado del Permiso:
                &nbsp;
                <span className={currentUser.permiso === 'Permitido' ? classes.subtitlePermitido : classes.subtitleDenegado}>
                    {currentUser.permiso}
                </span>
            </h1>
            <CodigoQr qrData={currentUser.qrData} className={classes.qrCode} />
            <div className={classes.textFieldContent}>
                <TextField
                    label="Nombre"
                    value={currentUser.nombre ? currentUser.nombre : "Nombre"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Apellido"
                    value={currentUser.apellido ? currentUser.apellido : "Apellido"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="DNI"
                    value={currentUser.dni ? currentUser.dni : "DNI"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Numero de Control Interno"
                    value={currentUser.numeroControl ? currentUser.numeroControl : "Control"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <textarea
                    name='comentario'
                    className={classes.textArea}
                    defaultValue={currentUser.comentario}
                    readOnly="readonly"
                />
            </div>
            <div className={classes.imagenContein}>
                <img src={currentUser.image ? currentUser.image : "#"} alt='No imagen' className={classes.imagen} />
            </div>
        </div >
    )
};

export default DetailPage;