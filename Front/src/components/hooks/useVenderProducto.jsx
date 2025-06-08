import {useEffect, useState , useContext} from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado';
 import { useEditProducto } from './useEditProducto'
export const useVenderProducto = () => {
    let token = sessionStorage.getItem('token')
    const [write , setwrite] = useState(false)
    const [im , setim] = useState(true)
    const [done , setdone] = useState(null)
    const [IDProducto , setIDProducto] = useState()
     const {  Imagenes , setImagenes  } = useContext(UserLogeadoContext);
    const [formDataVenderProducto, setformDataVenderProducto] = useState({
      Titulo: '',
      Descripcion: '',
      Precio: '',
      Categoria: '',
    })

          const [errors, setErrors] = useState({
        Titulo : false , 
        Descripcion : false ,
        Precio : false , 
        Categoria : false ,
    })

      const [texterrors, settextErrors] = useState({
        Titulo : false , 
        Descripcion : false ,
        Precio : false , 
        Categoria : false ,
    })

      const handelChangeVenderProducto  =   (event)=> {
       
    const {name , value} = event.target
     setformDataVenderProducto((prev)=>({
      ...prev ,
      [name] : value
     }))

         if (name == "Titulo") {
        
        if (value && value.length < 50) {
              setwrite(true)
          setErrors((prev) => ({
                ...prev,
                 Titulo: false,
            }));
        } else {
           setwrite(false)
                setErrors((prev) => ({
                ...prev,
                 Titulo: true,
            }));
           
        }
    }

             if (name == "Descripcion") {
             
        if (value && value.length < 640) {
           setwrite(true)
           setErrors((prev) => ({
                ...prev,
                 Descripcion: false,
            }));
        } else {
           setwrite(false)
                setErrors((prev) => ({
                ...prev,
                 Descripcion: true,
            }));
           
        }
    }

    
      if (name == "Precio") {
        if (value  && value < 200001) {
           setwrite(true)
           setErrors((prev) => ({
                ...prev,
                 Precio: false,
            }));
        } else {
           setwrite(false)
                setErrors((prev) => ({
                ...prev,
                 Precio: true,
            }));
           
        }
    }

      if (name == "Categoria") {
        if (value ) {
           setErrors((prev) => ({
                ...prev,
                 Categoria: false,
            }));
             setwrite(true)
        } else {
           setwrite(false)
                setErrors((prev) => ({
                ...prev,
                 Categoria: true,
            }));
           
        }
    }
  
  
  }

   const handelSubmitVenderProduct = async(event)=>{
    event.preventDefault();
     setdone(false)
if (
  formDataVenderProducto.Titulo === '' ||
  formDataVenderProducto.Descripcion === '' ||
  formDataVenderProducto.Precio === '' ||
  formDataVenderProducto.Categoria === ''
) {
  setErrors((prev) => ({
    ...prev,
    Titulo: formDataVenderProducto.Titulo === '',
    Descripcion: formDataVenderProducto.Descripcion === '',
    Precio: formDataVenderProducto.Precio === '',
    Categoria: formDataVenderProducto.Categoria === '',
  }));
    settextErrors((prev) => ({
    ...prev,
    Titulo: formDataVenderProducto.Titulo === '',
    Descripcion: formDataVenderProducto.Descripcion === '',
    Precio: formDataVenderProducto.Precio === '',
    Categoria: formDataVenderProducto.Categoria === '',
  }));
}
  if(write){
    
   if (errors.Titulo) {
        settextErrors((prev) => ({
            ...prev,
            Titulo: true,
        }));
    
   }else{
 settextErrors((prev) => ({
            ...prev,
            Titulo: false,
        }));
   }

      if (errors.Categoria) {
        settextErrors((prev) => ({
            ...prev,
            Categoria: true,
        }));
    
   }else{
 settextErrors((prev) => ({
            ...prev,
            Categoria: false,
        }));
   }

      if (errors.Precio) {
        settextErrors((prev) => ({
            ...prev,
            Precio: true,
        }));
    
   }else{
 settextErrors((prev) => ({
            ...prev,
            Precio: false,
        }));
   }

  if (errors.Descripcion) {
        settextErrors((prev) => ({
            ...prev,
            Descripcion: true,
        }));
    
   }else{
 settextErrors((prev) => ({
            ...prev,
            Descripcion: false,
        }));
   }
        const errores = Object.values(errors).every(value => value == false);

       
      
    if (errores) {
if ( Imagenes.filter(img => img).length > 0 && write) {
           
    
         await PostProducto() 
        setim(true)
        
}else{
   
   setim(false)
}
    }
        
        
    }else{
    
    }
  

    
  }

  const PostProducto = async ()=>{
     const {Titulo ,Descripcion, Precio ,  Categoria  } = formDataVenderProducto;
       
     
try {
                let objeto = {
                Titulo: Titulo,
                Descripcion: Descripcion,
                Precio: Precio,
                Categoria: Categoria,
               
                Fecha_hora_subida : "2000/10/05" ,
                Estado : "0" ,
                
                
                };

              let data = await fetch(`http://127.0.0.1:8000/producto/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(objeto),
              });

              if (data.ok) {
                const json = await data.json(); 
                const newId = json.new_id;      
                setdone(true);
                 
                    EditImages(newId)
              } else {
                console.error("Error al insertar producto");
              }
              

} catch (error) {
 
}
  }


    const EditImages = async (ide)=>{

for (const element of Imagenes) {

    if (element && element.img) {
        const objetoImg = {
            img: element.img,
            IDProducto : ide
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/imagenproducto/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(objetoImg),
            });
           

            if (response.ok) {
          
            } else {
           
            }

        } catch (error) {
            
        }

    
    }
}
        
            
  }

  useEffect(()=>{
  },[])

    return {formDataVenderProducto , errors, handelChangeVenderProducto , texterrors , handelSubmitVenderProduct ,im , done}
}
