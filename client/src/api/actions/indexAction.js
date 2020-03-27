import db from '../db';
import QRCode from 'qrcode';
import history from '../history';
import {
    SET_USER,
    SET_CURRENT_IMG,
    SET_CURRENT_USER,
    RESET_CURRENTS,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER
} from './typeAction';

export const setUser = (user) => async (dispatch) => {
    let newUser = user;
    let qrCode;
    let response;

    if (!user.id) {
        response = await db.post('/users', newUser);
    } else {
        response = await db.patch(`/users/${user.id}`, newUser);
    }

    if (user.permiso === 'Permitido') {
        try {
            //qrCode = await QRCode.toDataURL(`http://192.168.1.9:3000/detail/${id}`);
            qrCode = await QRCode.toDataURL(`https://app-muni.herokuapp.com/detail/${response.data.id}`);            
            newUser = { ...user, qrData: qrCode }
            response = await db.patch(`/users/${response.data.id}`, newUser);
        } catch (err) {
            console.error(err)
        }
    }

    history.push(`/detail/${response.data.id}`);

    dispatch({
        type: SET_USER,
        payload: response.data
    });
};

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
    const response = await db.get('/users');

    dispatch({
        type: FETCH_USERS,
        payload: response.data
    });
};

export const fetchUser = (id) => async dispatch => {
    const response = await db.get(`/users/${id}`);

    dispatch({
        type: FETCH_USER,
        payload: response.data
    });
};

export const deleteUser=(id)=>async dispatch => {
    await db.delete(`/users/${id}`); //-->falta manejo de error

    dispatch({
        type: DELETE_USER,
        payload: id
    });
};
