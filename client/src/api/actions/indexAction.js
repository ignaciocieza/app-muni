import axios from 'axios';
import QRCode from 'qrcode';
import { customAlphabet } from 'nanoid';
import db from '../db';
import history from '../history';
import {
    SET_USER,
    SET_CURRENT_IMG,
    SET_CURRENT_USER,
    SET_IS_HEADER,
    RESET_CURRENTS,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,
    SET_ADMIN,
    IS_FETCHING,
    IS_FETCHING_COMMERCE,
    IS_FETCHED,
    FIND_USER,
    SET_COMMERCE,
    SET_ERROR,
    SET_ALERTS,
    LOGOUT,
    SET_TOGGLE_IMG
} from './typeAction';
import { imageToBuffer, bufferToImage } from './herlperFunction';


export const setUser = (user, isCurrentUser) => async (dispatch) => {
    const { image, permiso } = user;
    let newUser = user;
    let qrCode;
    let error = 'Error interno del sistema';
    let nanoid;
    let date;

    try {
        newUser.image = await imageToBuffer(image);
        newUser.nombreComercio = user.nombreComercio ? user.nombreComercio : 'Sin especificar';
        newUser.domicilio = user.domicilio ? user.domicilio : 'Sin especificar';
        //https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
        //newUser.fechaAlta =  new Date().toLocaleString().split(' ')[0];
        date = new Date().toLocaleString();
        newUser.fechaAlta = user.fechaAlta ? user.fechaAlta : date;
        newUser.fechaModificacion = date;

        if (!user.numeroControl) {
            nanoid = customAlphabet(user.dni, 10);
            newUser.numeroControl = nanoid();
        }

        if (permiso === 'PENDIENTE') {
            newUser.qrData = 'nodata';
        }
        else {
            qrCode = await QRCode.toDataURL(`https://permiso.lasflores.gob.ar/detail/${newUser.dni}`);
            newUser.qrData = qrCode;
        }

        if (isCurrentUser) {
            error = 'Error en la base de datos';
            await axios.post('/mariadb', { type: 'patch', data: newUser });
        } else {
            error = 'Error con la base de datos, reintente o consulte en administrar en caso de que el usuario ya esté registrado';
            await axios.post('/mariadb', { type: 'post', data: newUser });
        }

    } catch (err) {
        console.error(err);
        return dispatch({
            type: SET_ERROR,
            payload: error
        });
    }

    if (user.permiso === 'PENDIENTE') {
        history.push('/home');
    } else {
        history.push(`/detail/${newUser.dni}`);
    }

    dispatch({
        type: SET_USER,
        payload: newUser
    });
};

export const setCommerce = (commerce) => async (dispatch) => {
    let newCommerce = commerce;
    let response;

    newCommerce.image = await imageToBuffer(commerce.image);

    if (!commerce.id) {
        try {
            response = await db.post('/commerces', newCommerce);
        } catch (err) {
            console.error(err)
        }
    } else {
        try {
            response = await db.patch(`/commerces/${commerce.id}`, newCommerce);
        }
        catch (err) {
            console.error(err)
        }
    }
    history.push('/home');

    dispatch({
        type: SET_COMMERCE,
        payload: response.data
    });
}

export const setCurrentImage = (img) => ({
    type: SET_CURRENT_IMG,
    payload: img
});

export const resetCurrents = () => ({
    type: RESET_CURRENTS,
});

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const setIsHeader = (value) => ({
    type: SET_IS_HEADER,
    payload: value
})


export const fetchUsers = () => async dispatch => {
    let response, returnObj;

    try {
        response = await axios.post('/mariadb', { type: 'get' });
        //https://stackoverflow.com/questions/19874555/how-do-i-convert-array-of-objects-into-one-object-in-javascript
        returnObj = response.data.reduce((accumulator, item) => {
            accumulator[item.DNI] = {
                nombre: item.nombre,
                apellido: item.apellido,
                permiso: item.permiso,
                comentario: item.comentario,
                image: bufferToImage(item.DNI_imagen),
                dni: item.DNI,
                numeroControl: item.num_control,
                qrData: bufferToImage(item.imagen),
                numeroTelefono: item.tel,
                domicilio: item.dir,
                nombreComercio: item.comercio,
                email: item.correo,
                permisoTipo: item.tipo_permiso,
                fechaModificacion: item.fecha_mod,
                fechaAlta: item.fecha_alta,
            };
            return accumulator;
        }, {});

        // response.data.forEach(item => {
        //     newResponse.push({
        //         nombre: item.nombre,
        //         apellido: item.apellido,
        //         permiso: item.permiso,
        //         comentario: item.comentario,
        //         image: bufferToImage(item.DNI_imagen),
        //         dni: item.DNI,
        //         numeroControl: item.num_control,
        //         qrData: bufferToImage(item.imagen),
        //         numeroTelefono: item.tel,
        //         domicilio: item.dir,
        //         nombreComercio: item.comercio,
        //         email: item.correo,
        //         permisoTipo: item.tipo_permiso,
        //         fechaModificacion: item.fecha_mod,
        //         fechaAlta: item.fecha_alta
        //     });
        // });
    } catch (err) {
        console.error(err);
    }

    dispatch({
        type: FETCH_USERS,
        payload: returnObj
    });
};

export const fetchUser = (dni) => async dispatch => {
    let response, auxResponse;

    try {
        response = await axios.post('/mariadb', { type: 'findOne', data: { dni } });
        const { nombre, apellido, permiso, comentario,
            DNI_imagen, DNI, num_control, imagen,
            tel, dir, comercio, correo, tipo_permiso, fecha_alta, fecha_mod
        } = response.data[0];

        auxResponse = {
            nombre: nombre,
            apellido: apellido,
            permiso: permiso,
            comentario: comentario,
            image: bufferToImage(DNI_imagen),
            dni: DNI,
            numeroControl: num_control,
            qrData: bufferToImage(imagen),
            numeroTelefono: tel,
            domicilio: dir,
            nombreComercio: comercio,
            email: correo,
            permisoTipo: tipo_permiso,
            fechaModificacion: fecha_mod,
            fechaAlta: fecha_alta
        };
    } catch (err) {
        console.error(err);
    }

    dispatch({
        type: FETCH_USER,
        payload: auxResponse
    });
};

export const deleteUser = (id) => async dispatch => {
    try {
        await axios.post('/mariadb', { type: 'delete', data: id });

    } catch (err) {
        console.error(err);
    }

    dispatch({
        type: DELETE_USER,
        payload: id
    });
};

export const setAdmin = (admin) => async dispatch => {
    const { email, password, isSignUp, newPassword } = admin;
    let response;

    try {
        if (isSignUp) {
            response = await axios.post('/mariadb/signup', { email, newPassword, password });
        } else {
            response = await axios.post('/mariadb/login', { email, password });
        }
    } catch (error) {
        console.log(error)
    }

    // if (email === 'admin@admin.com' && password === 'admin') {
    //     returnValue = true;
    // }
    if (response) {
        if (response.data.isUser) {
            history.push('/home');
            return dispatch({
                type: SET_ADMIN,
                payload: admin.email
            });
        }
    }

    dispatch({
        type: SET_ALERTS,
        payload: 'El email o la contraseña son incorrectos. Reintente!'
    });
};

export const setIsFetchingUser = (value) => ({
    type: IS_FETCHING,
    payload: value
})


export const setIsFetchingCommerce = (value) => ({
    type: IS_FETCHING_COMMERCE,
    payload: value
});

export const setIsFetchedUser = (value) => ({
    type: IS_FETCHED,
    payload: value
});

export const findUser = (userDni) => ({
    type: FIND_USER,
    payload: userDni
});

export const setErrorDB = (value) => ({
    type: SET_ERROR,
    payload: value
})

export const setAlerts = (values) => ({
    type: SET_ALERTS,
    payload: values
});

export const logout = () => ({ type: LOGOUT })

export const setToggleImg = (img) => ({
    type: SET_TOGGLE_IMG,
    payload: img
})


