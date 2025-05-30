import {useContext, useState} from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado'
import { UseProducto } from '../hooks/UseProducto'
import { useImageProducto } from '../hooks/useImageProducto'
import { MiniProducto } from '../Producto/MiniProducto'
import { useLogout } from '../hooks/useLogout';
import { Link } from 'react-router-dom'
import {  useDeleteUser} from '../hooks/useDeleteUser'

export const User = () => {
const {userLogeado} = useContext(UserLogeadoContext)
const [nump , setnump ] = useState(0)
  const { logout } = useLogout();
const {deleteuser} = useDeleteUser()

const {productosuser} = UseProducto()



  return (

    
  <div className=" justify-between items-center block   backdrop-blur-sm w-full">
<div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 p-4 rounded-lg shadow-lg bg-black/10 backdrop-blur-sm w-full">
  

  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
    <h2 className="text-2xl text-black font-semibold">{userLogeado.Nombre}</h2>
    <img className="w-20 h-20 mt-2 rounded-full object-cover"     src={`data:image/jpeg;base64,${userLogeado.ImgPerfil}`}     alt="Perfil"   />
  </div>


  <div className="flex flex-col items-center text-center space-y-2">
    <svg className="w-10 h-10 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>   </svg>   <a    href={`https://www.google.es/maps/place/${userLogeado.Provincia}, ${userLogeado.Ciudad_Pueblo}`}     target="_blank"    rel="noopener noreferrer"     className="text-lg text-black underline hover:text-blue-800"   >      {userLogeado.Provincia}, {userLogeado.Ciudad_Pueblo} </a>
  </div>

 
 <div className='block '>
  <div   onClick={logout}   className="cursor-pointer px-4 font-extrabold text-gray-500 hover:text-blue-900 flex items-center justify-center"  >
    <svg className="w-10 h-10 fill-black hover:fill-blue-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>   </svg>
  </div>
  <br />
  <Link to={"/home/edituser"}>
      <div  className="cursor-pointer px-4 font-extrabold text-gray-500 hover:text-blue-900 flex items-center justify-center"  >
   <svg className="w-10 h-10 fill-black hover:fill-blue-800"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l293.1 0c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1l-91.4 0zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z"/></svg>
  </div>
  </Link>
  <br />
    <div   onClick={deleteuser}   className="cursor-pointer px-4 font-extrabold text-gray-500 hover:text-blue-900 flex items-center justify-center"  >
   <svg className="w-10 h-10 fill-black hover:fill-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM471 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
  </div>


 </div>

</div>

<br />
    <div className='block flex-row justify-between items-center p-4 rounded-lg shadow-lg bg-black/4 backdrop-blur-sm w-full'>
    <div className=' border-b-3 border-blue-800 w-full p-3'>
      <h3 className='text-blue-800 text-3xl'> {productosuser.length} En venta</h3>

 </div>
<br />
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5' >
          {productosuser.map((producto, index) => {
          return <MiniProducto  producto={producto} /> 
          })}



    </div>



</div>
</div>

  
    
  )
}
