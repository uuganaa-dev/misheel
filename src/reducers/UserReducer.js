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
    case "CHANGE_CATID":
      return {
        ...state,
        carId: action.data,
        openMenu: false,
      };
    case "CHANGE_OPENMENU":
      return {
        ...state,
        openMenu: action.data,
      };
    case "CHANGE_LEFT_MENU":
      return {
        ...state,
        leftMenu: action.data,
      };

    default:
      return state;
  }
};
export default UserReducer;
