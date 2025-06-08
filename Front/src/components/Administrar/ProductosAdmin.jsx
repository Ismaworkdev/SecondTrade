import React from 'react'
import {useUserAdmin} from '../hooks/useUserAdmin'
import { Link } from 'react-router-dom'
export const ProductosAdmin = ({producto}) => {
const {Productos , DeleteProducto} = useUserAdmin()

  return (
 <div className="bg-gray-100 p-4 mt-7 rounded-2xl shadow-md w-full max-w-full min-w-[100%]">

  <div className="flex items-center gap-4">
  
    <div className='justify-start text-start w-full'>
<div>
        <Link 
      to={`/home/producto/${producto.IDProducto}`} className="underline text-lg text-end font-semibold text-blue-900">{producto.Titulo}
      </Link>
</div>
      <p       
      className="text-sm text-start text-gray-600  hover:text-blue-800"   > {producto.Precio}  €</p>
      
    
    </div>

    <svg  onClick={(event) =>{
        const abuelo = event.currentTarget.parentElement?.parentElement;
    if (abuelo) {
      abuelo.remove()
    }

    return DeleteProducto(producto.IDProducto)}} className='w-10 fill-red-600  hover:fill-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>

   
 </div>
</div>
)}
