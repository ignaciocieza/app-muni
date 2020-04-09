import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import Spinner from '../with-spinner/Spinner';
import useStyles from './transitionsModal.styles';

export default function TransitionsModal() {
    const classes = useStyles();
    //React.forwardRef: se usa cuando los componentes usan referencias internas ("innerRef")
    const AuxSpinner= React.forwardRef((props, ref) =><Spinner innerRef={ref} {...props} />);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={true}
                closeAfterTransition
                BackdropComponent={Backdrop}
                // BackdropProps={{
                //     timeout: 500,
                // }}
            >
                <Fade in={true}><AuxSpinner /></Fade>
            </Modal>
        </div>
    );
}

/**
 * <div className={classes.paper}>
                        <h2 id="transition-modal-title" className={classes.text}>Gracias por el comentario!</h2>
                        <p id="transition-modal-description" className={classes.text}>A la brevedad responderé.</p>
                    </div> 
 */