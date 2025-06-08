import {useContext, useState} from 'react'

import { UseProducto } from '../hooks/UseProducto'
import { useImageProducto } from '../hooks/useImageProducto'
import { MiniProducto } from '../Producto/MiniProducto'
import { useLogout } from '../hooks/useLogout';
import { Link , useParams} from 'react-router-dom'
import {  useDeleteUser} from '../hooks/useDeleteUser'
import { useUsuario } from '../hooks/useUsuario'
import { UserLogeadoContext  } from '../Context/UserLogeado';
export const User = () => {
  const {id} = useParams()

const {userLogeado} = useContext(UserLogeadoContext)
const {Usuario , show} = useUsuario({id}) 
const [nump , setnump ] = useState(0)
  const { logout } = useLogout();
const {deleteuser , isOpen , setIsOpen} = useDeleteUser()

const {productosuser} = UseProducto({id})



  return (

    
  <div className=" justify-between items-center block   backdrop-blur-sm w-full">
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl shadow-xl bg-gray-400 backdrop-blur-sm w-full items-center">


  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
    <h2 className="text-2xl font-bold text-black">{Usuario.Nombre}</h2>
    <img
      className="w-24 h-24 mt-3 rounded-full object-cover shadow-md"
      src={`data:image/jpeg;base64,${Usuario.ImgPerfil}`}
      alt="Perfil"
    />
  </div>


  <div className="flex flex-col items-center text-center space-y-3">
  
    <a
      href={`https://www.google.es/maps/place/${Usuario.Region}, ${Usuario.Ciudad_Pueblo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-lg text-black underline hover:text-blue-800"
    >
      {Usuario.Region}, {Usuario.Ciudad_Pueblo}
    </a>
  </div>

 
  {show && (

     <svg
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-4 top-4 w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer transition"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
      </svg>

      

    
  
  )}
        {isOpen && (
        <div className="absolute right-2 top-10 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          <ul className="py-2">
               {userLogeado.IDUsuario != 1 &&
                           <li onClick={deleteuser} className="cursor-pointer text-black-600 px-4 py-2 hover:text-red-800 flex items-center gap-2 transitio">
              Eliminar perfil
            </li>
               }
            <li  className="cursor-pointer text-black-600 px-4 py-2 hover:text-blue-800 flex items-center gap-2 transitio">
                    <Link to="/home/edituser">
                     Editar perfil
                     </Link>
            </li>
            <li onClick={logout} className="cursor-pointer px-4 py-2 text-black-600 hover:text-blue-800 flex items-center gap-2 transition"  >
              Cerrar session perfil
            </li>
          </ul>
        </div>
      )}


  
</div>


<br />
    <div className='block flex-row justify-between items-center p-4 rounded-lg shadow-lg bg-gray-400 backdrop-blur-sm w-full'>
    <div className=' border-b-3 border-blue-800 w-full p-3'>
      

 </div>
<br />
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 ' >
{productosuser.length !== 0 ? (
  
  productosuser.map((producto, index) => (
    <MiniProducto key={index} producto={producto} />
  ))
) : (
<div className="flex justify-center items-center w-full col-span-full py-10">
  <h3 className="text-center">
    {Usuario.Nombre} todavía no ha subido productos a SecondTrade.
  </h3>
</div>

)}




    </div>



</div>
</div>

  
    
  )
}
