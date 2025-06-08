import { useState, useEffect , useContext  } from 'react'
import {useImageProducto} from './useImageProducto'
import {useEditImageProducto} from './useEditImageProducto'
import { UserLogeadoContext } from '../Context/UserLogeado';
import { Navigate ,useNavigate  } from 'react-router-dom';

export const useEditProducto = ({ product  }) => {
  let token = sessionStorage.getItem('token')
  const [done , setdone] = useState(null)
     const {  Imagenes , setImagenes  } = useContext(UserLogeadoContext);
  const [im , setim] = useState(true)
 
    const navigate = useNavigate()
  const [formDataEditProducto, setformDataEditProducto] = useState({
    Titulo: product.Titulo,
    Descripcion: product.Descripcion,
    Precio: product.Precio,
    Categoria: product.Categoria,
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
  
  const handelChangeRditProducto  =   (event)=> {
    const {name , value} = event.target
     setformDataEditProducto((prev)=>({
      ...prev ,
      [name] : value
     }))

         if (name === "Titulo") {
        if (value && value.length < 50) {
           setErrors((prev) => ({
                ...prev,
                 Titulo: false,
            }));
        } else {
                setErrors((prev) => ({
                ...prev,
                 Titulo: true,
            }));
           
        }
    }

             if (name === "Descripcion") {
             
        if (value && value.length < 640) {
           setErrors((prev) => ({
                ...prev,
                 Descripcion: false,
            }));
        } else {
                setErrors((prev) => ({
                ...prev,
                 Descripcion: true,
            }));
           
        }
    }

    
      if (name === "Precio") {
        if (value  && value < 200001) {
           setErrors((prev) => ({
                ...prev,
                 Precio: false,
            }));
        } else {
                setErrors((prev) => ({
                ...prev,
                 Precio: true,
            }));
           
        }
    }

      if (name === "Categoria") {
        if (value ) {
           setErrors((prev) => ({
                ...prev,
                 Categoria: false,
            }));
        } else {
                setErrors((prev) => ({
                ...prev,
                 Categoria: true,
            }));
           
        }
    }
  
  }

  const handelSubmitEditProduct = async(event)=>{
    setdone(false)
   event.preventDefault();

   if (
  formDataEditProducto.Titulo === '' ||
  formDataEditProducto.Descripcion === '' ||
  formDataEditProducto.Precio ==='' ||
  formDataEditProducto.Categoria === ''
) {
  setErrors((prev) => ({
    ...prev,
    Titulo: formDataEditProducto.Titulo === '',
    Descripcion: formDataEditProducto.Descripcion === '',
    Precio: formDataEditProducto.Precio == '',
    Categoria: formDataEditProducto.Categoria === '',
  }));
    settextErrors((prev) => ({
    ...prev,
    Titulo: formDataEditProducto.Titulo === '',
    Descripcion: formDataEditProducto.Descripcion === '',
    Precio: formDataEditProducto.Precio === '',
    Categoria: formDataEditProducto.Categoria === '',
  }));
}else{





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
   if (Imagenes.filter(img => img).length > 0) {
            
        setim(true)

    await putProduct()

  }else{
  
   setim(false)
}
}
}
    
  }

  const putProduct = async ()=>{
   
 const {Titulo ,Descripcion, Precio ,  Categoria  } = formDataEditProducto;
       
     
try {
                let objeto = {
                Titulo: Titulo,
                Descripcion: Descripcion,
                Precio: Precio,
                Categoria: Categoria,
                IDUsuario : product.IDUsuario ,
                Fecha_hora_subida : product.Fecha_hora_subida ,
                Estado : product.Estado ,
                IDProducto : product.IDProducto
                };

                let data = await  fetch(`http://127.0.0.1:8000/producto/${product.IDProducto}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify(objeto),
                }).then(async (response) =>{
                  if (response.ok) {
                      setdone(true)
                    await DeleteImages()
                    
                  }
                })
              

} catch (error) {
  
}
  }
  const DeleteImages =async  ()=>{
            try {
            const response = await fetch(`http://127.0.0.1:8000/imagenproducto/?IDProducto=${product.IDProducto}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});
            

            if (response.ok) {
                EditImages()
            } else {
                console.error("Error al insertar imagen:", response);
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
  }

  const EditImages = async ()=>{


  for (const element of Imagenes) {
 
    if (element && element.img) {
        const objetoImg = {
            img: element.img,
            IDProducto : element.IDProducto
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
                  navigate(`/home/producto/${element.IDProducto}`, { replace: true })
            } else {
                console.error("Error al insertar imagen:", response);
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }

    
    }
}

        
            
  }


  useEffect(() => {
    if (product) {
      setformDataEditProducto({
        Titulo: product.Titulo || '',
        Descripcion: product.Descripcion || '',
        Precio: product.Precio || 0,
        Categoria: product.Categoria || '',
      })
    }
    
  }, [product , Imagenes])

  return { formDataEditProducto , handelChangeRditProducto  , errors , handelSubmitEditProduct , texterrors , im , done}
}
