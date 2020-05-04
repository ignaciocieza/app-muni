import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAdmin, resetCurrents, setIsHeader } from '../../../api/actions/indexAction';
import { SwipeableDrawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from './headerPhone.styles';

export default function HeaderPhone() {
    const [state, setState] = useState(false);
    const history = useHistory();
    const { admin } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const classes = useStyles();

    const itemList = [
        {
            text: 'Principal',
            route: '/home',
            icon: <HomeIcon />,
            keyValue: 'home'
        },
        {
            text: 'Permisos',
            route: '/permisos',
            icon: <DescriptionIcon />,
            keyValue: 'generar'
        },
        {
            text: 'Administrar',
            route: '/admin',
            icon: <SupervisorAccountIcon />,
            keyValue: 'admin'
        }
    ];

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {admin ? (
                <React.Fragment>
                    <List>
                        {itemList.map((item) => (
                            <ListItem
                                key={item.keyValue}
                                button
                                onClick={() => {
                                    setState(false);
                                    dispatch(resetCurrents());
                                    history.push(item.route);
                                }}
                            >
                                <ListItemIcon >{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            onClick={() => {
                                setState(false);
                                dispatch(setAdmin(false));
                                dispatch(resetCurrents());
                                history.push('/home');
                            }}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary='Salir' />
                        </ListItem>
                    </List>
                </React.Fragment>
            ) : (
                    <List>
                        <ListItem
                            button
                            onClick={() => {
                                setState(false);
                                dispatch(setIsHeader(false));
                                dispatch(resetCurrents());
                                history.push('/signin');
                            }}
                        >
                            <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                            <ListItemText primary='Entrar' />
                        </ListItem>
                    </List>
                )}
        </div>
    );

    return (
        <React.Fragment >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={'left'}
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </React.Fragment>
    );
}
