import userTypeActions from './userTypeActions';

//---"Redux" functions---------//

export const fetchUsersStart = () => ({
    type: userTypeActions.FETCH_USERS_START
});

export const fetchUsersSuccess = (users) => ({
    type: userTypeActions.FETCH_USERS_SUCCESS,
    payload: users
});

export const fetchUserStart = (dni)=>({
    type: userTypeActions.FETCH_USER_START,
    payload: dni
});

export const fetchUserSuccess=(user)=>({
    type: userTypeActions.FETCH_USER_SUCCESS,
    payload: user
});

export const setUserStart = (obj)=>({
    type: userTypeActions.SET_USER_START,
    payload: obj
});

export const setUserSuccess=(newUser)=>({
    type: userTypeActions.SET_USER_SUCCESS,
    payload: newUser
});

export const deleteUserStart = (id)=>({
    type: userTypeActions.DELETE_USER_START,
    payload: id
});

export const deleteUserSuccess=(id)=>({
    type: userTypeActions.DELETE_USER_SUCCESS,
    payload: id
});

export const setAdminStart = (admin)=>({
    type: userTypeActions.SET_ADMIN_START,
    payload: admin
});

export const setAdminSuccess=(email)=>({
    type: userTypeActions.SET_ADMIN_SUCCESS,
    payload: email
});

export const setCurrentImage = (img) => ({
    type: userTypeActions.SET_CURRENT_IMG,
    payload: img
});

export const setCurrentUser = (user) => ({
    type: userTypeActions.SET_CURRENT_USER,
    payload: user
});

export const findUser = (userDni) => ({
    type: userTypeActions.FIND_USER,
    payload: userDni
});

export const setToggleImg = (img) => ({
    type: userTypeActions.SET_TOGGLE_IMG,
    payload: img
});

export const setUserError = (error) => ({
    type: userTypeActions.SET_USER_ERROR,
    payload: error
});

//-------------"Thunks" functions-----------------------------//
// En info.txt