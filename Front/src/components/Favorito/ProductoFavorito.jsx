import React from 'react'
import { useProductoFavorito } from '../hooks/useProductoFavorito'
import { MiniProducto } from '../Producto/MiniProducto'
export const ProductoFavorito = () => {
    const {productos}  = useProductoFavorito()
   
     if(productos.length == 0){
 return <div className='aling-center w-full justify-center flex'>
  <h3>No hay Productos Favoritos  por ahora </h3>
 </div>
 }
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {productos.map((producto, index) => (
    <MiniProducto key={index} producto={producto} />
  ))}
</div>

  )
}
