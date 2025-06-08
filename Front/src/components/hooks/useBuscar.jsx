import {useEffect, useState , useContext} from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado';

export const useBuscar = () => {
  
    const token = sessionStorage.getItem('token');
    const {  formDataBuscar, setformDataBuscar , productos , setproductos } = useContext(UserLogeadoContext);
    

    const handelChangeBuscar = (event)=>{
 const {name , value} = event.target
      setformDataBuscar((prev)=>({
      ...prev ,
      [name] : value
     }))
    }



        const handelSubmitBuscar =async (event)=>{
 event.preventDefault();


console.log(formDataBuscar.Categoria)

if (formDataBuscar.Categoria !== '') {
  let string = formDataBuscar.string ? formDataBuscar.string  : "all"
  console.log(string)
            const data = await fetch(`http://127.0.0.1:8000/productoSearch/${string}/${formDataBuscar.Categoria}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((resul)=> resul.json())
          
        setproductos(data)
}else{
   setproductos([])
}

}

  return {handelChangeBuscar ,handelSubmitBuscar , formDataBuscar , productos }
}
