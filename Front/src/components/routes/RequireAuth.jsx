import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserLogeadoContext } from '../Context/UserLogeado';

export const RequireAuth = ({ children }) => {
  const { userLogeado, loading } = useContext(UserLogeadoContext);

  const isAuthenticated = Object.keys(userLogeado).length > 0;

  if (loading) return <div>Cargando...</div>; 
  

  return isAuthenticated ? children : <Navigate to="/Login" replace />;
};
