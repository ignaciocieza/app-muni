import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ImagePicker from '../../widgets/image-picker/ImagePicker';
import { setUser } from '../../../api/actions/indexAction';
import useStyles from './generarPermiso.style';

const GenerarPermiso = () => {
    const [userValues, setUserValues] = useState({ nombre: '', apellido: '', dni: '', numeroControl: '', comentario: '', permiso: '' });
    const [permisoSelect, setPermisoSelect] = useState('');
    const { currentImage, currentUser } = useSelector(state => state);
    const dispatch = useDispatch();
    const classes = useStyles();
    

    useEffect(() => {
        if (currentUser) {
            setUserValues({
                nombre: currentUser.nombre,
                apellido: currentUser.apellido,
                dni: currentUser.dni,
                comentario: currentUser.comentario,
                numeroControl: currentUser.numeroControl,
                permiso: currentUser.permiso,
                id: currentUser.id
            })
        }
    }, [currentUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setUser({ ...userValues, permiso: permisoSelect ? permisoSelect : userValues.permiso, image: currentImage }));
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserValues({ ...userValues, [name]: value });
    };

    const selectChange = (event) => {
        setPermisoSelect(event.target.value)
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h1 className={classes.title}>Generar Permiso</h1>
            <div className={classes.textfieldContent} >
                <TextField
                    required
                    label="Nombre"
                    name="nombre"
                    className={classes.textfield}
                    onChange={handleChange}
                    value={userValues.nombre}
                />
                <TextField
                    required
                    label="Apellido"
                    name="apellido"
                    value={userValues.apellido}
                    className={classes.textfield}
                    onChange={handleChange} />
                <FormControl required className={classes.formControl}>
                    <InputLabel id="demo-simple-select-required-label">Permiso</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={permisoSelect ? permisoSelect : userValues.permiso}
                        name='permiso'
                        onChange={selectChange}
                    >
                        <MenuItem value={'Permitido'}>Permitido</MenuItem>
                        <MenuItem value={'Denegado'}>Denegado</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    label="Dni"
                    name="dni"
                    value={userValues.dni}
                    className={classes.textfield}
                    onChange={handleChange} />
                <TextField
                    required
                    label="Nro de Control Interno"
                    name="numeroControl"
                    value={userValues.numeroControl}
                    className={classes.textfield}
                    onChange={handleChange} />
            </div>
            {/* <label className={classes.contactoLabel}>Comentario</label> */}
            <ImagePicker />
            {/* <TextareaAutosize aria-label="Comentario" placeholder="Empty" className={classes.textArea} /> */}
            {/* <label className={classes.textAreaLabel}>Comentario</label> */}
            <textarea
                name='comentario'
                className={classes.textArea}
                placeholder='Comentario'
                onChange={handleChange}
                value={userValues.comentario}
                required
            />
            {currentImage ?
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    type='submit'
                >
                    Enviar
                </Button> :
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Enviar
                </Button>
            }
        </form>
    );
};

export default GenerarPermiso;