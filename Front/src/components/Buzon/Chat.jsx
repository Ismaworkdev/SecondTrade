import React, { useState , useContext  } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import { UserLogeadoContext } from '../Context/UserLogeado'
import { useuserMini } from '../hooks/useuserMini'
import {Mensaje} from './Mensaje'
import { useConversacion } from '../hooks/useConversacion'
import { Navigate ,useNavigate  } from 'react-router-dom';
export const Chat = () => {
      const { conver , setconver} = useContext(UserLogeadoContext)
  
   const {getConvers} = useConversacion()
    const navigate = useNavigate()
  const {ideC} = useParams()
  const {Conve , elotro , Postmensaje ,msg , handelchangemsg , mensajes , isOpen, setIsOpen , deleteConversacion , exist} = useChat({ideC})
  const {User  } = useuserMini({idU : elotro})
  console.log(mensajes)
if (Object.keys(conver).length == 0 ) {
 
  return navigate("/home/buzon/", { replace: true });
}


  return (

<div className="w-[60%] p-4 rounded-2xl shadow-md bg-gray-600 m-3 relative overflow-hidden h-[100%] flex flex-col">

  {/* Encabezado */}
<div className='w-full flex  justify-between '>
  <div className="bg-gray-300 p-4 rounded-2xl shadow-md w-full relative">
 <svg
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-2 top-2 w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer transition"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
      </svg>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-2 top-10 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          <ul className="py-2">
            <li onClick={() => {
              deleteConversacion();
              getConvers();
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
              Eliminar conversación
            </li>
          </ul>
        </div>
      )}
    
    <div className="flex items-center gap-4">
      <img
        className="w-20 h-20 rounded-full object-cover border-2 border-white-200"
        src={`data:image/jpeg;base64,${User.ImgPerfil}`}
        alt="Perfil"
      />
      <div className="w-full flex justify-end items-center space-x-4 text-end">
        

          <Link to={`/home/user/${User.IDUsuario}`} className="underline text-lg font-semibold text-gray-800">
          {User.Nombre}
        </Link>
     


        </div>
      </div>
    </div>
  


</div>


  <div className="flex flex-col gap-3 px-4 py-2 overflow-y-auto flex-grow">
     
     <Mensaje Mensajes ={mensajes} />
      

  </div>

 
  <form
    noValidate
    onSubmit={Postmensaje}
    className="flex items-center gap-2 bg-gray-600 pt-4 pb-4 px-2 border-t border-gray-500"
  >
    <input
      type="text"
      placeholder="Escribe un mensaje..."
      className="flex-grow p-2 rounded-xl bg-gray-200 text-gray-800 focus:outline-none"
      value={msg}
      onChange={handelchangemsg}
    />
    <button
      type="submit"
      className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-500"
    >
      Enviar
    </button>
  </form>
</div>



  )
}
