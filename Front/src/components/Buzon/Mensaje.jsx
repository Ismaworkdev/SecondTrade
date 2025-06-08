import {useContext} from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado'
export const Mensaje = ({Mensajes}) => {
     const {userLogeado} = useContext(UserLogeadoContext) 
  return (
<div className="flex flex-col gap-3 px-4 py-2 overflow-y-auto flex-grow">
  {Mensajes.map((msg, index) => (
    msg.IDUsuario === userLogeado.IDUsuario ? (
      <div
        key={index}
        className="self-end w-fit max-w-[85%] bg-gray-500 text-white p-3 rounded-2xl shadow-md mb-2 sm:text-sm md:text-base"
      >
        {msg.Mensaje}
      </div>
    ) : (
      <div
        key={index}
        className="self-start w-fit max-w-[85%] bg-gray-300 text-gray-800 p-3 rounded-2xl shadow-md mb-2 sm:text-sm md:text-base"
      >
        {msg.Mensaje}
      </div>
    )
  ))}

  
</div>

  )
}
