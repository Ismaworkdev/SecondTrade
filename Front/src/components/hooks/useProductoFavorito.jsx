import React, { useEffect, useState } from 'react'

export const useProductoFavorito = () => {
    const [productos , setproductos] = useState([])
    const token = sessionStorage.getItem('token');
    const getProducts = async ()=>{
            const data = await fetch(`http://127.0.0.1:8000/productofavorito/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then((resul)=>resul.json())

          if (data) {

            setproductos(data)
          
          }
    }

    useEffect(()=>{
getProducts()

    },[])
    
  return {productos}
}
