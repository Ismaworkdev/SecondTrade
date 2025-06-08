import React from 'react'
import {useUserAdmin} from '../hooks/useUserAdmin'
import { ProductosAdmin } from './ProductosAdmin'
export const ProductoAdmin = () => {
const {Productos} = useUserAdmin()

  return (
 <div >
                      {Productos.map((producto, index) => {
                          return <ProductosAdmin  producto={producto} /> 
                          })}
 
 
</div>
  )
}
