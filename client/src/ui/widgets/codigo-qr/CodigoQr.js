import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import useStyles from './codigoQr.styles';

const CodigoQr = ({qrData}) => {
    const classes = useStyles();

    return (
        <div className={classes.imagenContent}>
            <img src={qrData} alt='No imagen' className={classes.imagen} /> {/**Imagen QR */}
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<ArrowDownwardIcon fontSize="inherit" />}
            >
                Descargar QR
            </Button>
            <a href={qrData} download className={classes.downloadTag}>Click to download</a>
        </div>
    )
};

export default CodigoQr;