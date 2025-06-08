import React from 'react'
import { useOneProduct } from '../hooks/useOneProduct'
import { useImageProducto } from '../hooks/useImageProducto'
import { Link } from 'react-router-dom'
import { useConversacion } from '../hooks/useConversacion'
export const MiniConver = ({IDEP , IDEC}) => {
    const { product } = useOneProduct({idProducto : IDEP})
     const { imageProductos } = useImageProducto({ IDEP });
     const {getConvers} = useConversacion()
     let reload = async ()=>{

getConvers()
     }
    
  return (
<Link to={`/home/buzon/${IDEC}`} onClick={reload}>

         <div className="bg-gray-600 p-4 rounded-2xl shadow-md w-full mt-5 ">
  <div className="flex items-center gap-4">
    <img className="w-15 h-15 rounded-full object-cover border-2 border-white-200" src={
            imageProductos.length > 0
              ? `data:image/jpeg;base64,${imageProductos[0].img}`
              : "placeholder.jpg"
          }/>
    <div className='justify-between  flex text-start w-full'>

        <p className="  text-lg text-end font-semibold text-white-200">
          {product.Titulo}
      </p>

    
    </div>
  
 </div>
</div>
</Link>
  )
}
