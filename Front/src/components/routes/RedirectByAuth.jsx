import { useContext } from 'react';
import { UserLogeadoContext } from '../Context/UserLogeado';
import { Navigate } from 'react-router-dom';

export const RedirectByAuth = ({ children }) => {
  const { userLogeado } = useContext(UserLogeadoContext);
  const isAuthenticated = Object.keys(userLogeado).length > 0;

    if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children; // Renderiza <Login /> o <Register />
};
