import {useContext} from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado';


export const useLogout = () => {
    const { userLogeado, setUserLogeado} = useContext(UserLogeadoContext);
    const logout = () => {
        sessionStorage.removeItem('token');
        setUserLogeado({});
        window.location.href = '/Login'; 
    };


  return { logout}
}
