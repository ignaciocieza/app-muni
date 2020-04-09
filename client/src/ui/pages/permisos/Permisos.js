import React from 'react';
import CardPermisos from '../../widgets/card-permiso/CardPermiso';
import useStyles from './permisos.styles';

const Permisos = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.title}>GESTIÓN DE PERMISOS</span>
            <span className={classes.subtitle}>PANEL DE GESTIÓN DE PERMISOS, LUGAR DONDE PUEDE SOLICITAR EL PERMISO DESEADO</span>
            <div className={classes.permisosContent}>
                <CardPermisos title='De Circulación' onClick={'/permiso/circulacion'}/>
                <CardPermisos title='De Delivery' onClick={'/permiso/delivery'} />
            </div>            
        </div>    
    );
};

export default Permisos;