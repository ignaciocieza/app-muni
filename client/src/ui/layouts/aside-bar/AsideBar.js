import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrents } from '../../../api/actions/commonActions';
import { Hidden } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DescriptionIcon from '@material-ui/icons/Description';
import useStyles from './asideBar.styles';

export default function AsideBar() {
    const [isActive, setIsActive] = useState(false);
    const { admin } = useSelector(state => state.user);
    const { agente } = useSelector(state => state.agente);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    let location = useLocation();

    useEffect(() => {
        setIsActive(location.pathname);
    }, [location]);

    if (!admin && !agente) { return null };

    return (
        <Hidden smDown >
            <div className={classes.root}>
                <div
                    className={isActive === '/home' ? classes.contentButtonActive : classes.contentButton}
                    onClick={() => {
                        dispatch(resetCurrents());
                        history.push('/home');
                    }}
                >
                    <HomeIcon className={isActive === '/home' ? classes.iconActive : classes.icon} />
                    <span className={classes.title}>Principal</span>
                </div>
                <div
                    className={isActive === '/permisos' ? classes.contentButtonActive : classes.contentButton}
                    onClick={() => {
                        dispatch(resetCurrents());
                        history.push('/permisos');
                    }}
                >
                    <DescriptionIcon className={isActive === '/permisos' ? classes.iconActive : classes.icon} />
                    <span className={classes.title}>Permisos</span>
                </div>
                {admin && (<div
                    className={isActive === '/admin' ? classes.contentButtonActive : classes.contentButton}
                    onClick={() => {
                        dispatch(resetCurrents());
                        history.push('/admin');
                    }}>
                    <SupervisorAccountIcon className={isActive === '/admin' ? classes.iconActive : classes.icon} />
                    <span className={classes.title}>Administrar</span>
                </div>)}
            </div>
        </Hidden>
    )
};