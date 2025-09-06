import { createContext, useContext } from "react";

export const AuthContext = createContext({
  username: null,
  token: null,
  isAuthenticated: false,
  login: (username , token) => {
    return{username : username , token : token}
  },

  logout : () => {

  }
});
//export the useAuth as function because of 1- it is a react hook and hooks must start with use , be functions , follow rules of hooks 
export const useAuth = () => useContext(AuthContext);