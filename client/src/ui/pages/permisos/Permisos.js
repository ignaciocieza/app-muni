import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardPermisos from '../../widgets/card-permiso/CardPermiso';
import { setIsHeader } from '../../../api/actions/commonActions';
import useStyles from './permisos.styles';

const Permisos = () => {
    const classes = useStyles();
    const { agente: { agente }, user: { admin } } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setIsHeader(true))
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <span className={classes.title}>GESTIÓN DE PERMISOS</span>
            <span className={classes.subtitle}>PANEL DE GESTIÓN DE PERMISOS, LUGAR DONDE PUEDE SOLICITAR EL PERMISO DESEADO</span>
            <div className={classes.permisosContent}>
                <CardPermisos title='Permiso' subtitle='De Circulación' onClick={'/permiso/circulacion'} />
                {(agente || admin) && <CardPermisos title='Permiso' subtitle='De Ingreso y Egreso' onClick={'/permiso/ingreso'} />}
                <CardPermisos title='Permiso' subtitle='De Pesca' onClick={'/permiso/pesca'} />
            </div>
        </div>
    );
};

export default Permisos;