import adminUsersType from "./adminUsersTypes";

export function setNewUser(user) {
  return {
    type: adminUsersType.SET_NEW_USER,
    payload: user,
  };
}
