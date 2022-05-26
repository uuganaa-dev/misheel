const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userInfo: action.data,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
      };
    case "SET_CATLIST":
      return {
        ...state,
        catList: action.data,
      };

    default:
      return state;
  }
};
export default UserReducer;
