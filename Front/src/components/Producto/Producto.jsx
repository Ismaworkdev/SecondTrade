
import React, { use, useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import { useOneProduct } from '../hooks/useOneProduct'  
import { useImageProducto } from '../hooks/useImageProducto'
import defauluser from '../../assets/default_user.jpg'
import {Carrusel} from './Carrusel'
import {UserMini} from './UserMini'
export const Producto = () => {

    const {idProducto} = useParams()
    const { product , mg , Postmg , show , deleteProducto ,  PostConver } = useOneProduct({idProducto})

    const { imageProductos } = useImageProducto({ IDEP : product.IDProducto});
   
  return (
    <div>
<div className="block w-[800px] mx-auto rounded-xl overflow-hidden shadow-lg">

  <div className="w-full h-96 sm:h-[30rem]">
    <Carrusel imageProductos={imageProductos} />


    
  </div>
  
    </div>

  <div>
    

  
  <div className="bg-gray-400 rounded-xl p-8">
 
{  show ? 
   <div className="bg-gray-100 p-5 pb-8 rounded-2xl shadow-md  justify-between flex items-center">
              <buton onClick={deleteProducto}   className="text-white bg-blue-900 hover:bg-red-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0">
                  Eliminar Producto
                  <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </buton>
                  <Link  to={`/home/producto/editproduct/${idProducto}`} className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-2xl sm:w-auto sm:mb-0">
                  Editar Producto
                  <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </Link>
</div>
 : '' }

 
 <br/>
    
<div className='bg-gray-100 p-4 rounded-2xl shadow-md '>
      <h2 className="text-gray-800 text-start  text-3xl">{product.Titulo}</h2>
    <p className="font-montserratMedium text-gray-600 mt-4 text-start text-lg max-w-[700px]">{product.Descripcion}</p>
    <p className="font-montserratMedium text-gray-600 mt-4 text-start text-lg">{product.Categoria}</p>
    <div className="flex items-center justify-between mt-6">
      <p className="font-montserratRegular text-2xl tracking-wide text-gray-700">{product.Precio} €</p>
      {mg ? <svg onClick={Postmg}  className='w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ff0000" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>   
       :   <svg onClick={Postmg}  className='w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg> }
     
    </div>
</div>
     <div className="    mx-auto mt-4">
  <UserMini idU = {product.IDUsuario}/>

 </div>

    {  !show ? 
    <div className="mt-8">
      <p onClick={PostConver} className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl ">
        Enviar Mensaje al Vendedor 
        <svg className="w-6 h-6 ml-3 transform transition-transform group-hover:translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </p>
    </div>
    : ''}
  </div>
</div>

    </div>
    
   
  )
}
