import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Zoom } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setErrorDB, setToggleImg } from '../../../api/actions/indexAction';
import Spinner from '../with-spinner/Spinner';
import useStyles from './transitionsModal.styles';

/**
 * Si no se pone entre {} los paramentros, se considera que cada uno tiene un objeto vacio,
 * en cambio con {}, se considera undefine --> Porque se considera como Componente y no una funcion ????
 * @param {*} param0 
 */
export default function TransitionsModal({ timeOut, comentTitle, comentSubtitle, image }) {
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    const dispatch = useDispatch();
    //React.forwardRef: se usa cuando los componentes usan referencias internas ("innerRef")
    const AuxSpinner = !comentTitle && React.forwardRef((props, ref) => <Spinner innerRef={ref} {...props} />);

    if (timeOut) {
        setTimeout(() => {
            setOpen(false);
            dispatch(setErrorDB(false))
        }, timeOut);
    };

    if (image) {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => {
                    setOpen(!open);
                    dispatch(setToggleImg());
                }}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <Zoom in={open}>
                    <img alt='no img' src={image} className={classes.image} />
                </Zoom>

            </Modal>
        )
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
            // BackdropProps={{
            //     timeout: 500,
            // }}
            >
                {
                    comentTitle ? (
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title" className={classes.text}>{comentTitle}</h2>
                            <p id="transition-modal-description" className={classes.text}>{comentSubtitle}</p>
                        </div>)
                        : (
                            <Fade in={true}><AuxSpinner /></Fade>
                        )
                }
            </Modal>
        </div>
    );
}
