import React from 'react';
import { useSelector } from 'react-redux';
//import Lottie from 'react-lottie';
import imageMunicipalidad from '../../../assets/MUNILASFLORES.jpg';
import ActionAlerts from '../../widgets/action-alerts/ActionAlerts';
import useStyles from './homePage.styles';

//const animationData = require('../../../assets/20033-buildings-going-up.json')

const HomePage = () => {
    const classes = useStyles();
    const { isFetched , admin} = useSelector(state => state.user);
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: 'xMidYMid slice'
    //     }
    // };

    return (
        <div className={classes.content}>
            {/* <Lottie options={defaultOptions}
                height={400}
                width={400} /> */}
            {/* {(isFetched) && <h1 className={classes.title}>¡Solicitud enviada con éxito!</h1>} */}
            <div className={classes.imagenContent}>
                <img src={imageMunicipalidad} alt='No imagen' className={classes.imagen} />
            </div>
            {(isFetched) && (
                <div className={classes.alert}>
                    <ActionAlerts type='success' text='Solicitud enviada con éxito.'  />
                </div>
            )}
            {(admin) && (
                <div className={classes.alert}>
                    <ActionAlerts type='info' text='Bienvenido! Ha ingresado correctamente.'/>
                </div>
            )}
        </div>

    );
};

export default HomePage;