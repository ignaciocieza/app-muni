import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import useStyles from './codigoQr.styles';

const CodigoQr = ({ qrData }) => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.imagenContent}>
                <img src={qrData} alt='No se pudo generar el código QR, debido a que el estado del permiso es PENDIENTE' className={classes.imagen} />
            </div>
            <a href={qrData} download className={classes.downloadTag}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowDownwardIcon fontSize="inherit" />}
                >
                    Descargar QR
                </Button>
            </a>
        </div>
    )
};

export default CodigoQr;