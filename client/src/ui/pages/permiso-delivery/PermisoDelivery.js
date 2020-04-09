import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { TextField, Button, Icon, MenuItem, Select, FormControl } from '@material-ui/core';
import { TextField, Button, Icon } from '@material-ui/core';
import ImagePicker from '../../widgets/image-picker/ImagePicker';
import { setCommerce, setIsFetchingCommerce } from '../../../api/actions/indexAction';
import Modal from '../../widgets/modal/TransitionsModal';
import useStyles from './permisoDelivery.style';

const PermisoDelivery = () => {
    const [userValues, setUserValues] = useState({ nombre: '', apellido: '', dni: '', numeroControl: '', comentario: '', permiso: '' });
    //const [permisoSelect, setPermisoSelect] = useState('');
    const { commerce, user } = useSelector(state => state);
    const dispatch = useDispatch();
    const classes = useStyles();
    const { currentCommerces, isFetching } = commerce;

    useEffect(() => {
        if (currentCommerces) {
            setUserValues({
                nombre: currentCommerces.nombre,
                apellido: currentCommerces.apellido,
                dni: currentCommerces.dni,
                email: currentCommerces.email,
                nombreComercio: currentCommerces.nombreComercio,
                cuil: currentCommerces.cuil,
                domicilio: currentCommerces.domicilio,
                numeroTelefono: currentCommerces.numeroTelefono,
                repartidores: currentCommerces.repartidores,
                // comentario: currentUser.comentario,
                // numeroControl: currentUser.numeroControl,
                // permiso: currentUser.permiso,
                id: currentCommerces.id
            });
        }
    }, [currentCommerces]);

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.dir({ ...userValues, image: user.currentImage });
        dispatch(setIsFetchingCommerce(true));
        // dispatch(setIsGenerated(false));
        dispatch(setCommerce({ ...userValues, image: user.currentImage }));
        // if (admin) {
        //     dispatch(setUser({ ...userValues, image: user.currentImage }));
        // } else {
        //     dispatch(setUser({ ...userValues, permiso: 'PENDIENTE', image: user.currentImage }));
        // }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserValues({ ...userValues, [name]: value });
    };

    // const selectChange = (event) => {
    //     setPermisoSelect(event.target.value)
    // };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <span className={classes.title}>FORMULARIO DE DELIVERY</span>
            <span className={classes.subtitle}>NOMBRE</span>
            <TextField
                variant="outlined"
                required
                name="nombre"
                className={classes.textfield}
                onChange={handleChange}
                value={userValues.nombre}
                placeholder="* Nombre del titular del comercio"
            />
            <span className={classes.subtitle}>APELLIDO</span>
            <TextField
                variant="outlined"
                required
                name="apellido"
                value={userValues.apellido}
                className={classes.textfield}
                onChange={handleChange}
                placeholder="* Apellido del titular del comercio"
            />
            <span className={classes.subtitle}>D.N.I</span>
            <TextField
                variant="outlined"
                required
                name="dni"
                value={userValues.dni}
                className={classes.textfield}
                onChange={handleChange}
            />
            <ImagePicker title='DNI REPARTIDORES' subtitle='Tomar una foto del frente del DNI de los repartidores autorizados' />
            <span className={classes.subtitle}>DIRECCIÓN DE CORREO ELECTRÓNICO</span>
            <TextField
                variant="outlined"
                required
                name="email"
                value={userValues.email}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>NOMBRE DEL COMERCIO</span>
            <TextField
                variant="outlined"
                required
                name="nombreComercio"
                value={userValues.nombreComercio}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>CUIL</span>
            <TextField
                variant="outlined"
                required
                name="cuil"
                value={userValues.cuil}
                className={classes.textfield}
                onChange={handleChange}
                placeholder="* Cuil del titular del comercio"
            />
            <span className={classes.subtitle}>DOMICILIO</span>
            <TextField
                variant="outlined"
                required
                name="domicilio"
                value={userValues.domicilio}
                className={classes.textfield}
                onChange={handleChange}
            />
            <span className={classes.subtitle}>NÚMERO DE TELÉFONO</span>
            <TextField
                variant="outlined"
                required
                name="numeroTelefono"
                value={userValues.numeroTelefono}
                className={classes.textfield}
                onChange={handleChange}
                placeholder="* Whatsapp: CODIGO DE AREA + NUMERO (TOTAL 10 NUMEROS)"
            />
            <span className={classes.subtitle}>REPARTIDORES</span>
            <textarea
                name='repartidores'
                className={classes.textArea}
                placeholder='* Listar el Nombre Completo y DNI de los repartidores autorizados'
                onChange={handleChange}
                value={userValues.repartidores}
                required
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                type='submit'
            >
                Enviar
            </Button>
            {isFetching && <Modal />}
        </form>
    );
};

export default PermisoDelivery;