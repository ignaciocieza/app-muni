import React, { useEffect } from 'react';
import CardPermisos from '../../widgets/card-permiso/CardPermiso';
import useStyles from './permisos.styles';

const Permisos = () => {
    const classes = useStyles();

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className={classes.root}>
            <span className={classes.title}>GESTIÓN DE PERMISOS</span>
            <span className={classes.subtitle}>PANEL DE GESTIÓN DE PERMISOS, LUGAR DONDE PUEDE SOLICITAR EL PERMISO DESEADO</span>
            <div className={classes.permisosContent}>
                <CardPermisos title='Permiso' subtitle='De Circulación' onClick={'/permiso/circulacion'} />
                {/* <CardPermisos title='De Delivery' onClick={'/permiso/delivery'} /> */}
                <CardPermisos title='Próximamente' subtitle='De Delivery' />
            </div>
        </div>
    );
};

export default Permisos;