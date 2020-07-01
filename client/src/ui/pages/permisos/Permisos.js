import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import CardPermisos from '../../widgets/card-permiso/CardPermiso';
import useStyles from './permisos.styles';

const Permisos = () => {
    const classes = useStyles();
    const { agente } = useSelector(state => state.agente);

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className={classes.root}>
            <span className={classes.title}>GESTIÓN DE PERMISOS</span>
            <span className={classes.subtitle}>PANEL DE GESTIÓN DE PERMISOS, LUGAR DONDE PUEDE SOLICITAR EL PERMISO DESEADO</span>
            <div className={classes.permisosContent}>
                {!agente && <CardPermisos title='Permiso' subtitle='De Circulación' onClick={'/permiso/circulacion'} />}
                <CardPermisos title='Permiso' subtitle='De Ingreso y Egreso' onClick={'/permiso/ingreso'} />
                {/* <CardPermisos title='Próximamente' subtitle='De Delivery' />*/}
            </div>
        </div>
    );
};

export default Permisos;