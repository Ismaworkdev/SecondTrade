import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserLogeadoContext } from '../Context/UserLogeado';

export const useUserAdmin = () => {
    const { userLogeado, loading } = useContext(UserLogeadoContext);
    const token = sessionStorage.getItem('token');
    const [Users , setUsers] = useState([])
    const [Productos , setProductos] = useState([])


         const getUsuarios = async ()=>{
             const data = await fetch(`http://127.0.0.1:8000/usuario/`, {
             method: 'GET',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
             }
           }).then((resul)=>resul.json())
          const filteredData = data.filter(user => user.IDUsuario !== 1);

           setUsers(filteredData);
            
           
     }


      const getproductos = async ()=>{
             const data = await fetch(`http://127.0.0.1:8000/producto/`, {
             method: 'GET',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
             }
           }).then((resul)=>resul.json())
          

           setProductos(data);
            
           
     }

     const DeletuserAdmin =async (IDUsuario)=>{
          const data = await fetch(`http://127.0.0.1:8000/usuario/${IDUsuario}`, {
             method: 'DELETE',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
             }
           }).then((resul)=>{
                if( resul.ok){
            getUsuarios()
          }
           })

         
     }

     
     const DeleteProducto =async (IDProducto)=>{
          const data = await fetch(`http://127.0.0.1:8000/producto/${IDProducto}`, {
             method: 'DELETE',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
             }
           }).then((resul)=>{
                if( resul.ok){
            getproductos()
          }
           })

         
     }




     useEffect(()=>{
    getUsuarios()
    getproductos()
     },[])

    return {Users  , Productos, DeletuserAdmin , DeleteProducto}
}
