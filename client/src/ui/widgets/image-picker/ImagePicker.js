import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentImage } from '../../../api/actions/indexAction';
import Button from '@material-ui/core/Button';
import useStyles from './imagePicker.styles';

const ImagePicker = () => {
    const { currentImage } = useSelector(state => state);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleImage = (e) => {
        const file = e.target.files[0];
        let reader;

        if (file) {
            reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                dispatch(setCurrentImage(e.target.result));
            }
        }
    }

    return (
        <div className={classes.imagenContent}>
            {currentImage ?
                <img src={currentImage} alt='No imagen' className={classes.imagen} /> :
                <h3 className={classes.titleImage}>Cargue la Imagen para el Permiso</h3>
            }
            <div className={classes.uploadContent}>
                <input
                    accept="image/*"
                    className={classes.input}
                    name="image"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                        handleImage(e);
                    }}
                />
                <label htmlFor="contained-button-file" className={classes.button}>
                    <Button variant="contained" color="primary" component="span">
                        Subir Imagen
                        </Button>
                </label>
            </div>
        </div>
    );
}

export default ImagePicker;