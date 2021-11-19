import adminUsersType from "../../actions/admin-users/adminUsersTypes";

const INITIAL_STATE = {
  users: [],
};

const adminUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case adminUsersType.SET_NEW_USER:
      return {
        ...state,
        users: action.payload,
      };
    // return {
    //   ...state,
    //   users: {
    //     ...state.users,
    //     [action.payload.email]: action.payload,
    //   },
    // };
    default:
      return state;
  }
};

export default adminUsersReducer;
