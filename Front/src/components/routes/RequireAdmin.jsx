import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserLogeadoContext } from '../Context/UserLogeado';

export const RequireAdmin = ({ children }) => {
      const { userLogeado, loading } = useContext(UserLogeadoContext);
      const isAdmin = userLogeado.IDUsuario == 1;
      return isAdmin ? children : <Navigate to="/home" replace />;
}
