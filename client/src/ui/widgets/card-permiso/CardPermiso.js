import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardMedia } from '@material-ui/core';
import userImage from '../../../assets/usuario.png';
import useStyles from './cardPermiso.styles';

export default function CardPermiso({ title, onClick }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} onClick={()=>history.push(onClick)}>
            <div className={classes.details}>
                <span className={classes.title}>Permiso</span>
                <span className={classes.subtitle}>{title}</span>
            </div>
            <CardMedia
                className={classes.cover}
                image={userImage}
            />
        </Card>
    );
}
