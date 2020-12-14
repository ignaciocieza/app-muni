export const deleteAux = (users, id) =>{
    const auxUser = {...users};
    delete auxUser[id];
    return auxUser;
}