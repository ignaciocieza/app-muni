import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentImage } from '../../../api/actions/user/userActions';
import noImage from '../../../assets/no-imagen.png'
import Button from '@material-ui/core/Button';
import useStyles from './imagePicker.styles';

const ImagePicker = ({ title, subtitle }) => {
    const { currentImage } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleImage = (e) => {
        let reader;
        //let formData;
        const file = e.target.files[0];
        // formData = new FormData();
        // formData.append('file', file);
        // console.dir(formData)
        //axios.post('/fileupload', formData)
        
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
            <span className={classes.title}>{title}</span>
            {subtitle && <span className={classes.subtitle}>{subtitle}</span>}
            <div className={classes.uploadContent}>
                {(currentImage &&  (currentImage !== 'Sin especificar')) ?(
                    <img src={currentImage} alt='No imagen' className={classes.imagen} />) :(
                    <img src={noImage} alt='No imagen' className={classes.imagen} />)
                } 
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
            </div>
            <label htmlFor="contained-button-file" className={classes.buttonContent} >
                <Button variant="contained" color='primary' component="span">
                    Subir Imagen
                </Button>
            </label>

        </div>
    );
}

export default ImagePicker;