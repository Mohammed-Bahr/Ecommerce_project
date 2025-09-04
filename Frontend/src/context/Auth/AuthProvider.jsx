import { useState } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState(
    localStorage.getItem(TOKEN_KEY)
  );

  const isAuthenticated = !!token; // to convert it to boolean value

  const login = (username, token) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };

//   const logout = () => {
//     localStorage.removeItem(USERNAME_KEY);
//     localStorage.removeItem(TOKEN_KEY);
//     setUsername(null);
//     setToken(null);
//   };

  return (
    <AuthContext.Provider
      value={{ username, token, isAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;