import { createContext, useContext, useState, useEffect } from 'react';

export const UserLogeadoContext = createContext();

export const UserLogeado = ({ children }) => {
  const [userLogeado, setUserLogeado] = useState({});
  const [Imagenes , setImagenes] = useState([])
  const [loading, setLoading] = useState(true); 
   const token = sessionStorage.getItem('token');
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
    <UserLogeadoContext.Provider value={{ userLogeado, setUserLogeado, loading , Imagenes , setImagenes }}>
      {children}
    </UserLogeadoContext.Provider>
  );
};
