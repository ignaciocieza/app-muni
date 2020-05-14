import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ActionAlerts from '../../widgets/action-alerts/ActionAlerts';

/**
 * Funcion que se usa cuando hay una lista de alertas
 * @param {alertas} param0 
 */
export default function AlertsList({ alertas }) {
    const classes = useStyles();
    return (
        <div className={classes.rootAlertsList}>
            {
                alertas.map(item => <ActionAlerts key={item.key} {...item} />)
            }
        </div >
    )
};

const useStyles = makeStyles((theme) => ({
    rootAlertsList: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        bottom: '0%',
        right: '2%',
        [theme.breakpoints.down('md')]: {
            width: '97%',
        }
    },
}));