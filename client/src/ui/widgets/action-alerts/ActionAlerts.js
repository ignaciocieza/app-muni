import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

/**
 * Funcion que se usa para una alerta
 * @param {obj de alerta} param0 
 */
export default function ActionAlerts({ type, text }) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(true);
    const { alerts } = useSelector(state => state.user);

    useEffect(() => {
        setIsOpen(true);
    }, [alerts]);

    return (
        <Fragment>
            {isOpen && (
                <div className={classes.root}>
                    {(type === 'error') && <Alert variant="filled" severity="error" onClose={() => setIsOpen(false)}>{text}</Alert>}
                    {(type === 'success') && <Alert variant="filled" severity="success" onClose={() => setIsOpen(false)}>{text}</Alert>}
                    {(type === 'info') && <Alert variant="filled" severity="info" onClose={() => setIsOpen(false)}>{text}</Alert>}
                    {/*
            <Alert variant="filled" severity="warning">
                This is a warning alert — check it out!
            </Alert>
            <Alert variant="filled" severity="info">
                This is an info alert — check it out!
            </Alert>
             */}
                </div>
            )}
        </Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '0.2%',
    },
}));