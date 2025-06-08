import React, { useEffect, useState } from 'react'

export const useUsuarioFavorito = () => {
     const [usuarios , setusuarios] = useState([])
     const token = sessionStorage.getItem('token');
     const getUsuarios = async ()=>{
             const data = await fetch(`http://127.0.0.1:8000/usuarioFavorito/`, {
             method: 'GET',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
             }
           }).then((resul)=>resul.json())
 
           if (data) {
 
             setusuarios(data)
            
           }
     }
 
     useEffect(()=>{
 getUsuarios()
 
     },[])
     
   return {usuarios}
}
