import React, { useEffect, useState , useContext } from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado';
export const useEditImageProducto = ({imageProductos , IDEP}) => {
    const [ImageEdit, setImageEdit] = useState(new Array(5).fill(null));
    const [imgSubida , setimgsubida] =  useState(null)
     const {  Imagenes , setImagenes  } = useContext(UserLogeadoContext);
      useEffect(() => {
    setImageEdit(imageProductos || []);
  }, [imageProductos]);
    const deleteImg = (index)=>{
        setImageEdit(prev => {
        const updated = [...prev];
        updated[index] = null;
        return updated; 
        });
   
     
    }

     const addImg = async (event)=>{
        const file = event.target.files[0];
      
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64WithHeader = reader.result; 
      const base64 = base64WithHeader.split(',')[1]; 
      resolve(base64); 
    };
    reader.onerror = (error) => reject(error);
  });

         const base64Img =  await toBase64(file);
        const imagen = {
            IDProducto : IDEP , 
            img :base64Img

        }
        
if (true) { 
  setImageEdit(prev => {
    const updated = [...prev];
    const nullIndex = updated.findIndex(item => item === null);

    if (nullIndex !== -1) {
     
      updated[nullIndex] = imagen;
    } else if (updated.length < 5) {
     
      updated.push(imagen);
    } else {
    
      
    
    }

    return updated;
  });
}

    }
   useEffect(()=>{
  setImageEdit(imageProductos)

   },[imageProductos])
      useEffect(()=>{

  setImagenes(ImageEdit)
   },[ImageEdit])
    return{ImageEdit , deleteImg , addImg , imgSubida}
}
