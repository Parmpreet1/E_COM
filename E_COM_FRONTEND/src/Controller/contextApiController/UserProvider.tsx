import React from "react";
import { userContext } from "../../Modal/contextApi/userContext";
import { useState } from "react";
export const UserProvider = ({ children }) => {
  const [isLogged, setisLogged] = useState(false);
  const login = () => {
    setisLogged(true);
  };
  const logout = () => {
    setisLogged(false);
  };
  const signup = () => {};
  const login_check = () => {};

  return (
    <userContext.Provider
      value={{
        login,
        logout,
        signup,
        login_check,
        isLogged,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
