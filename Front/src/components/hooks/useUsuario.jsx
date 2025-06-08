import  { useEffect, useState , useContext } from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado'
import { Navigate ,useNavigate  } from 'react-router-dom';
export const useUsuario = ({id}) => {
    const navigate = useNavigate()
 
  const [Usuario , setUsuario] = useState({})
  const [show , setshow ] = useState(false)
 const {userLogeado} = useContext(UserLogeadoContext)
 const getUsuario = async ()=>{
      const data = await fetch(`http://127.0.0.1:8000/usuario/UserProfile/${id}`)
        .then((res) => res.json())
      
       setUsuario(data);
    
      }
 
const determinateuser = async() =>{
   if (id) {
  
    getUsuario()
    
 
    if (id == userLogeado.IDUsuario ) {
      
      setshow(true)
         navigate("/home/user/", { replace: true })

    }else{
      setshow(false)
    }

  } else {
    setUsuario(userLogeado)
   
    setshow(true)
  }
}
     
useEffect(() => {
 determinateuser()
  
}, [id])


  return {Usuario , show}
}
