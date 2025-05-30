import {useEffect, useContext, useState}from 'react';
import { Link } from 'react-router-dom';

export const useImageProducto = ({product}) => {
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
        
          if (product) {
              getImages(product.IDProducto);
            console.log(imageProductos)
          }
        
        
    }, [product]);

  


  return {imageProductos}
}
