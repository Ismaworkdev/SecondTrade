import React, { useEffect, useState , useContext } from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado';
export const useEditImageProducto = ({imageProductos , product}) => {
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
    console.log(ImageEdit)
     
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
            IDProducto : product.IDProducto , 
            img :base64Img

        }
        
        if (ImageEdit.length +1 <= 5) {
          console.log(ImageEdit.length)
        setImageEdit(prev => {
        const updated = [...prev];
        updated[ImageEdit.length] = imagen;
        return updated; 
        });
    console.log(ImageEdit)
  
            
        }else{
           console.log(ImageEdit)
            console.log("no hay espaciooooooooooooooooooooooooo")
        }
    }
   useEffect(()=>{
  setImageEdit(imageProductos)
  console.log(ImageEdit)
   },[imageProductos])
      useEffect(()=>{
 console.log("hahhaha")
  setImagenes(ImageEdit)
   },[ImageEdit])
    return{ImageEdit , deleteImg , addImg , imgSubida}
}
