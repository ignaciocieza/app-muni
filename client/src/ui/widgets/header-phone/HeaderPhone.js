import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAdmin, resetCurrents } from '../../../api/actions/indexAction';
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
            text: 'Home',
            route: '/',
            icon: <HomeIcon />,
            keyValue: 'home'
        },
        admin ? {
            text: 'Administrar',
            route: '/admin',
            icon: <SupervisorAccountIcon />,
            keyValue: 'admin'
        } : { keyValue: 'admin' },
        {
            text: 'Generar Permiso',
            route: '/generar',
            icon: <DescriptionIcon />,
            keyValue: 'generar'
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
            <List>
                {itemList.map((item) => (
                    <ListItem
                        key={item.keyValue}
                        button
                        onClick={() => {
                            setState(false);
                            dispatch(resetCurrents())
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
                {admin ?
                    <ListItem
                        button
                        onClick={() => {
                            setState(false);
                            dispatch(setAdmin(false));
                            history.push('/');
                        }}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary='Sign Out' />
                    </ListItem>
                    :
                    <ListItem
                        button
                        onClick={() => {
                            setState(false);
                            history.push('/signin');
                        }}
                    >
                        <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                        <ListItemText primary='Sign In' />
                    </ListItem>
                }
            </List>
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
