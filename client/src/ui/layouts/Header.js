import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin, resetCurrents } from '../../api/actions/indexAction';
import HeaderPhone from '../widgets/header-phone/HeaderPhone';
import { Hidden } from '@material-ui/core';
import imageMuni from '../../assets/escudo-gob-municipal.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './header.styles';

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.user);
    const history = useHistory();

    return (
        <div className={classes.root}>
            <div className={classes.rootContein}>
                <div className={classes.imageContent}>
                    <img src={imageMuni} alt='no imagen' className={classes.image} />
                </div>
                <Hidden smDown >
                    {admin ?
                        <div className={classes.buttonContent}>
                            <Avatar className={classes.imageAvatar}>AD</Avatar>
                            <div className={classes.titleContent}>
                                <span className={classes.title}>ADMINISTRADOR</span>
                                <span className={classes.subTitle}>SEC. HACIENDA</span>
                            </div>
                            <ExitToAppIcon
                                className={classes.icon}
                                onClick={() => {
                                    dispatch(setAdmin(false));
                                    dispatch(resetCurrents())
                                    history.push('/home');
                                }}
                            />
                        </div>
                        :
                        <VpnKeyIcon className={classes.iconSignIn} onClick={() => history.push('/')} />
                    }
                </Hidden>
                <Hidden smUp >
                    <HeaderPhone />
                </Hidden>
            </div>
        </div>
    );
}

export default Header;