import {useEffect, useContext, useState}from 'react';
import { Link } from 'react-router-dom';
import { UserLogeadoContext } from '../Context/UserLogeado';
export const UseProducto = ({id}) => {
    const [productosuser , setproductosuser] = useState([]);
   
    const { userLogeado } = useContext(UserLogeadoContext);
    const token = sessionStorage.getItem('token');

        const getPrducto = async () => {
          let ide = id ? id : -1
      if (token) {
        
          
            const data = await fetch(`http://127.0.0.1:8000/productoUser/${ide}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then((resul)=> resul.json())
            
          setproductosuser(data)
          
         

      }
    };



    useEffect(() => {
        getPrducto();
       
    }, []);

  return {productosuser }
}
