import QRCode from 'qrcode';
import db from '../db';
import axios from 'axios';
import history from '../history';
import {
    SET_USER,
    SET_CURRENT_IMG,
    SET_CURRENT_USER,
    RESET_CURRENTS,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,
    SET_ADMIN,
    IS_FETCHING,
    IS_FETCHING_COMMERCE,
    IS_FETCHED,
    FIND_USER,
    SET_COMMERCE
} from './typeAction';
import { imageToBuffer, bufferToImage } from './herlperFunction';


export const setUser = (user, isCurrentUser) => async (dispatch) => {
    let newUser = user;
    let qrCode;
    let response;

    newUser.image = await imageToBuffer(user.image);

    if (user.permiso === 'PERMITIDO') {
        try {
            qrCode = await QRCode.toDataURL(`https://app-muni.herokuapp.com/detail/${newUser.dni}`);
            newUser.qrData = qrCode;
        } catch (err) {
            console.error(err)
        }
    }else{
        newUser.qrData = 'nodata';
    }
    try{
        if(isCurrentUser){
            response = await axios.post('/mariadb', { type: 'patch', data: newUser });
        }else{
            response = await axios.post('/mariadb', { type: 'post', data: newUser });
        }
        
    }catch(err) {
        //throw err;
        console.log(err);
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
})

export const fetchUsers = () => async dispatch => {
    let response;
    let newResponse = [];

    try {
        response = await axios.post('/mariadb', { type: 'get' });
        response.data.forEach(item => {
            newResponse.push({
                nombre: item.nombre,
                apellido: item.apellido,
                permiso: item.permiso,
                comentario: item.comentario,
                image: bufferToImage(item.DNI_imagen),
                dni: item.DNI,
                numeroControl: item.num_control,
                qrData: bufferToImage(item.imagen)
            });
        })
    } catch (err) {
        console.error(err);
    }

    dispatch({
        type: FETCH_USERS,
        payload: newResponse
    });
};

export const fetchUser = (id) => async dispatch => {
    let response;
    let image;

    try {
        //response = await await db.get(`/users/${id}`);
        image = response.data.image.data;
        response.data.image = bufferToImage(image);
    } catch (err) {
        console.error(err);
    }

    dispatch({
        type: FETCH_USER,
        payload: response.data
    });
};

export const deleteUser = (id) => async dispatch => {
    //await db.delete(`/users/${id}`); //-->falta manejo de error
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

export const setAdmin = (admin) => {
    const { email, password } = admin;
    let returnValue = false;

    if (email === 'admin@admin.com' && password === 'admin') {
        returnValue = true;
    }

    return ({
        type: SET_ADMIN,
        payload: returnValue
    });
};

export const setIsFetchingUser = (value) => ({
    type: IS_FETCHING,
    payload: value
});

export const setIsFetchingCommerce = (value) => ({
    type: IS_FETCHING_COMMERCE,
    payload: value
});

export const setIsFetchedUser = (value) => ({
    type: IS_FETCHED,
    payload: value
});

// export const setIsGenerated = (value) => ({
//     type: IS_GENERATED,
//     payload: value
// });

export const findUser = (userDni) => ({
    type: FIND_USER,
    payload: userDni
})



