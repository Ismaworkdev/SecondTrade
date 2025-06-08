import { createContext, useContext, useState, useEffect } from 'react';

export const UserLogeadoContext = createContext();

export const UserLogeado = ({ children }) => {
  const [userLogeado, setUserLogeado] = useState({});
  const [Imagenes , setImagenes] = useState([])
  const [productos , setproductos] = useState([])
  const [loading, setLoading] = useState(true);
  const [   act , setact ] = useState(false)
  const [conver , setconver] = useState([])
   const token = sessionStorage.getItem('token');
       const [formDataBuscar, setformDataBuscar] = useState({
      string : '' ,
      Categoria: 'Todos'
    })

    const getinfouser = async () => {
      if (token) {
        
          const data = await fetch(`http://127.0.0.1:8000/usuario/getuser/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then((resul)=> resul.json())
          setUserLogeado(data)
          
      }else{
        setUserLogeado({});
      
       
      }
       setLoading(false);
      
    };
   useEffect(() => {
    getinfouser();
  }, []);



  return (
    <UserLogeadoContext.Provider value={{ getinfouser, formDataBuscar, setformDataBuscar,productos , setproductos , userLogeado, setUserLogeado, loading , Imagenes , setImagenes , setact , act ,conver , setconver}}>
      {children}
    </UserLogeadoContext.Provider>
  );
};
