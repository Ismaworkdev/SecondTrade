import { useState, useEffect , useContext  } from 'react'
import {useImageProducto} from './useImageProducto'
import {useEditImageProducto} from './useEditImageProducto'
import { UserLogeadoContext } from '../Context/UserLogeado';

export const useEditProducto = ({ product  }) => {
  let token = sessionStorage.getItem('token')
     const {  Imagenes , setImagenes  } = useContext(UserLogeadoContext);


  
  const [formDataEditProducto, setformDataEditProducto] = useState({
    Titulo: '',
    Descripcion: '',
    Precio: 0,
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
   event.preventDefault();
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
console.log("sontodos falseo ??" ,errores)
console.log(errors)
console.log(product)
if (errores) {
   
  await putProduct()
  
}

    
  }

  const putProduct = async ()=>{
    console.log("çaaaaaaajajajajajajajjaajj")
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
                    console.log("http://127.0.0.1:8000/imagenproducto/?IDProducto=2314")
                    await DeleteImages()
                    
                  }
                })
              

} catch (error) {
  console.log(error)
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
  console.log(Imagenes)
    if (element && element.img) {
        const objetoImg = {
            img: element.img,
            IDProducto: element.IDProducto
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
            console.log(objetoImg)

            if (response.ok) {
                console.log("Imagen insertada correctamente");
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

  return { formDataEditProducto , handelChangeRditProducto  , errors , handelSubmitEditProduct , texterrors}
}
