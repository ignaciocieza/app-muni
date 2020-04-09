import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findUser } from '../../../api/actions/indexAction';
import TextField from '@material-ui/core/TextField';
import CodigoQr from '../../widgets/codigo-qr/CodigoQr';
import useStyles from './detailPage.styles';

const DetailPage = ({ match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { currentUser} = useSelector(state => state.user);
    const {permiso, qrData, nombre , apellido, dni, numeroControl, comentario, image } = currentUser ? currentUser : 'nodata';
    useEffect(() => {
        dispatch(findUser(match.params.id));
    }, [match, dispatch]);

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
                value={nombre ? nombre : "Nombre"}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>APELLIDO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={apellido ? apellido : "Apellido"}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>D.N.I</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={dni ? dni : "DNI"}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>NRO DE CONTROL INTERNO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={numeroControl ? numeroControl : "Control"}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>COMENTARIO</span>
            <textarea
                variant="outlined"
                className={classes.textArea}
                value={comentario}
                readOnly="readonly"
            />
            <div className={classes.imagenContein}>
                <img src={image ? image : '#'} alt='No imagen' className={classes.imagen} />
            </div>
        </div >
    )
};

export default DetailPage;