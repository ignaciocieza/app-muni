import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findUser, fetchUser } from '../../../api/actions/indexAction';
import TextField from '@material-ui/core/TextField';
import CodigoQr from '../../widgets/codigo-qr/CodigoQr';
import useStyles from './detailPage.styles';

const DetailPage = ({ match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { currentUser, users } = useSelector(state => state.user);
    const { permiso, qrData, nombre, apellido, dni, numeroControl, comentario, image } = currentUser ? currentUser : '';

    useEffect(() => {        
        if (!users.length) {
            console.log('entra al ferch user')
            dispatch(fetchUser(match.params.id));
        }else{
            console.log('entra al findUser')
            dispatch(findUser(match.params.id));
        }
        window.scrollTo(0, 0);
    }, [dispatch, match, users]);

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
            <span className={classes.subtitle}>D.N.I</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={dni || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>NRO DE CONTROL INTERNO</span>
            <TextField
                className={classes.textfield}
                variant="outlined"
                value={numeroControl || ''}
                InputProps={{
                    readOnly: true,
                }}
            />
            <span className={classes.subtitle}>COMENTARIO</span>
            <textarea
                variant="outlined"
                className={classes.textArea}
                value={comentario || ''}
                readOnly="readonly"
            />
            <div className={classes.imagenContein}>
                <img src={image ? image : '#'} alt='No imagen' className={classes.imagen} />
            </div>
        </div >
    )
};

export default DetailPage;