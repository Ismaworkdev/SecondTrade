import {useEffect, useContext, useState}from 'react';
import { Link } from 'react-router-dom';
import { UserLogeadoContext } from '../Context/UserLogeado';
export const UseProducto = () => {
    const [productosuser , setproductosuser] = useState([]);
   
    const { userLogeado } = useContext(UserLogeadoContext);
    const token = sessionStorage.getItem('token');

        const getPrducto = async () => {
      if (token) {
        
          const data = await fetch(`http://127.0.0.1:8000/producto/`, {
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
