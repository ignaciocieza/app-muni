import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Zoom } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

/**
 * Funcion que se usa para una alerta
 * @param {obj de alerta} param0 
 */
export default function ActionAlerts({ type, text, isTypeClose }) {
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
                    {(type === 'error') && (
                        <Zoom in={isOpen} >
                            {isTypeClose ? (
                                <Alert variant="filled" severity="error" >{text}</Alert>
                            ) : (
                                    <Alert variant="filled" severity="error" onClose={() => setIsOpen(false)}>{text}</Alert>
                                )}
                        </Zoom>
                    )}
                    {(type === 'success') && (
                        <Zoom in={isOpen}>
                            <Alert variant="filled" severity="success" onClose={() => setIsOpen(false)}>{text}</Alert>
                        </Zoom>
                    )}
                    {(type === 'info') && (
                        <Zoom in={isOpen}>
                            <Alert variant="filled" severity="info" onClose={() => setIsOpen(false)}>{text}</Alert>
                        </Zoom>
                    )}
                </div>
            )}
        </Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '0.2%',
    }
}));

/*
<Alert variant="filled" severity="warning">
    This is a warning alert — check it out!
</Alert>
<Alert variant="filled" severity="info">
    This is an info alert — check it out!
</Alert>
             */