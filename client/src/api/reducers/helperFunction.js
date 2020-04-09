export const deleteAuser = (users, id) => users.filter(user => user.dni !== id);

export const addUser = (users, newUser) => {
    const auxDni = newUser.dni;
    let isUserDni = false;
    let mapArray;
    if (users.length) {
        mapArray = users.map(user => {
            if (user.dni === auxDni) {
                isUserDni = true;
                return user = newUser;
            };
            return user;
        });
    }
    if (!isUserDni) {
        users.push(newUser);
        return users;
    }
    return mapArray;
};

export const findUserValue = (users, userDni) => (
    users.find(user => user.dni === parseInt(userDni)) 
)
