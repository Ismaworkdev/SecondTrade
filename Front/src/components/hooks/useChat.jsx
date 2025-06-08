import React, { useState , useContext ,useEffect , useRef } from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado'
import { Navigate ,useNavigate  } from 'react-router-dom';
import { useConversacion } from './useConversacion';
export const useChat = ({ideC}) => {
  const [exist , setexist] = useState(true ) 
    const [Conve , setConve ] = useState({})
     const socketRef = useRef(null);
     const {getConvers} = useConversacion()
      const {userLogeado , setact , act } = useContext(UserLogeadoContext)
     const [elotro , setelotro] = useState (null)
     const [mensajes , setmensajes] = useState([])
     const [news, setnews] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
     const [msg , setmgs] = useState('')
         let token = sessionStorage.getItem('token')
     const navigate = useNavigate()

     
  const deleteConversacion = async () => { 
         if (ideC) {
          const data = await fetch(`http://127.0.0.1:8000/conversacion/?IDConversacion=${ideC}`, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        }).then( async(resul)=> 
        {
          if(resul.ok){
            setact(!act)
           
             navigate("/home/buzon/", { replace: true })
            
          }else{
            
          }
        })
        getConvers()
}
      }
     
     const getConver = async () =>{
    
        const data = await fetch(`http://127.0.0.1:8000/conversacion/${ideC}`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
    
                }
        })
        .then((resul) => resul.json())
    
        setConve(data)
          if (data.IDUsuarioComprador == userLogeado.IDUsuario ) {
      setelotro(data.IDUsuarioVendedor)
    }else{
      setelotro(data.IDUsuarioComprador)
    } 
      } 
      const handelchangemsg = (event)=>{
      const {value} = event.target
       setmgs(value)  
    }

      const getMensajes = async ()=>{
                const data = await fetch(`http://127.0.0.1:8000/mensaje/?IDConversacion=${ideC}`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
    
                }
        })
        .then((resul) => resul.json())
       
    
        setmensajes(data)
        
       
      }

      const Exist = async ()=>{
                const data = await fetch(`http://127.0.0.1:8000/conversacion/exist/${ideC}`,{
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
    
                }
        })
        .then((resul) => resul.json())
       
    
        setexist(data)
        
       
      }


const Postmensaje = async (event) => {
  event.preventDefault();
  if (msg) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
      Exist()
       setmgs('')  
    } else {
      console.error("WebSocket no está conectado");
    }
  }
};


    

     

const abrirConexionWebSocket = () => {
  const url = `ws://localhost:8000/mensaje/ws/${ideC}/${userLogeado.IDUsuario}`;
  const newSocket = new WebSocket(url);
  socketRef.current = newSocket;

  newSocket.onopen = () => {
    
  };

newSocket.onmessage = (event) => {
  const newMessage = JSON.parse(event.data); 

  setmensajes(prevMensajes => [...prevMensajes, newMessage]);
Exist()
getConvers()
  
};




  newSocket.onclose = () => {
   
  };

  newSocket.onerror = (error) => {
    console.error("Error en WebSocket:", error);
  };
};



      
useEffect(() => {
  getConver();
getConvers()
 

  abrirConexionWebSocket();

  
  return () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };
}, [ideC]); 


useEffect(() => {
  getMensajes();
  Exist()
}, [ideC]);

  return { Conve , elotro , Postmensaje , msg , handelchangemsg , mensajes ,  isOpen, setIsOpen , deleteConversacion , exist}
}
