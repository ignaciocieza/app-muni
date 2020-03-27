export const deleteAuser = (users, id) => users.filter(user => user.id !== id);

export const addUser = (users, newUser) => {
    const auxId = newUser.id;
    let isUserId = false;
    let mapArray;
    if(users.length){
        mapArray = users.map(user => {
            if (user.id === auxId) {
                isUserId = true;
                return user = newUser;
            };
            return user;
        });
    }

    if (!isUserId) {
        users.push(newUser);
        return users;
    }
    return mapArray;
};