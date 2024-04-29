/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUser } from '../services/userApi';
import toast from 'react-hot-toast';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('jwt-gone'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('jwt-gone', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('jwt-gone');
      return;
    }
    if (!user) {
      getUser()
        .then((user) => setUser(user))
        .catch((err) => {
          toast.error(err.message);
          localStorage.removeItem('jwt-gone');
        });
    }
  }, [token, user]);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
      setUser,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
