import React, { useContext, useReducer, useEffect } from "react";
import UserReducer from "../reducers/UserReducer";
import * as API from "../api/request";

const UserContext = React.createContext();

const initialState = {
  userInfo: {},
  loggedIn: false,
  catList: [],
  carId: undefined,
  openMenu: false,
  leftMenu: false,
};

export const useUserState = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserState нь UserContextProvider дотор ашиглагдах ёстой!"
    );
  }
  return context;
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useReducer(UserReducer, initialState);

  const logOut = () => {
    localStorage.removeItem("data");
    setUser({ type: "LOGOUT" });
    window.location = "/";
  };

  useEffect(() => {
    API.getCategory()
      .then((res) => {
        setUser({ type: "SET_CATLIST", data: res.data.data });
      })
      .catch((err) => console.log(err));
    if (localStorage.getItem("data")) {
      const userdata = localStorage.getItem("data");
      setUser({ type: "LOGIN", data: JSON.parse(userdata) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default React.memo(UserContextProvider);
