import React from 'react';
import { useSelector } from 'react-redux';
import imageMunicipalidad from '../../../assets/MUNILASFLORES.jpg';
import useStyles from './homePage.styles';

const HomePage = () => {
    const classes = useStyles();
    const { isFetched, admin } = useSelector(state => state.user);

    return (
        <div className={classes.content}>
            {(isFetched ) && <h1 className={classes.title}>¡Solicitud enviada con exito!</h1>}
            <div className={classes.imagenContent}>
                <img src={imageMunicipalidad} alt='No imagen' className={classes.imagen} />
            </div>
        </div>

    );
};

export default HomePage;