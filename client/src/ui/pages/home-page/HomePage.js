import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import Lottie from 'react-lottie';
import { setIsHeader } from '../../../api/actions/indexAction';
import imageMunicipalidad from '../../../assets/MUNILASFLORES.jpg';
import ActionAlerts from '../../widgets/action-alerts/ActionAlerts';
import useStyles from './homePage.styles';

//const animationData = require('../../../assets/progress-and-loading-animation.json');

const HomePage = () => {
    const { isFetched, admin } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: animationData,
    //     rendererSettings: {
    //         preserveAspectRatio: 'xMidYMid slice',
    //          //preserveAspectRatio: 'xMidYMid meet'
    //     }
    // };
    useEffect(() => {dispatch(setIsHeader(true))}, [dispatch]);

    return (
        <div className={classes.content}>
            {/* <Lottie options={defaultOptions}
                height={400}
                width={400} /> */}
            <div className={classes.imagenContent}>
                <img src={imageMunicipalidad} alt='No imagen' className={classes.imagen} />
            </div>
            {(isFetched) && (
                <div className={classes.alert}>
                    <ActionAlerts type='success' text='Solicitud enviada con éxito.' />
                </div>
            )}
            {(admin) && (
                <div className={classes.alertSuccs}>
                    <ActionAlerts type='info' text='Bienvenido! Ha ingresado correctamente.' />
                </div>
            )}
        </div>

    );
};

export default HomePage;