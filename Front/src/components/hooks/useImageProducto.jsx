import {useEffect, useContext, useState}from 'react';
import { Link } from 'react-router-dom';

export const useImageProducto = ({IDEP}) => {

 const [imageProductos , setImageProductos] = useState([]);
        const getImages = async (idProducto) => {
if (idProducto) {
    
          const data = await fetch(`http://localhost:8000/imagenproducto/IDProducto/${idProducto}`, {
            method: 'GET',

          }).then((resul)=> resul.json())
            
          setImageProductos(data)
}
      
    };

    useEffect(() => {
        
          if (IDEP) {
              getImages(IDEP);
          
          }
        
        
    }, [IDEP]);

  


  return {imageProductos}
}
