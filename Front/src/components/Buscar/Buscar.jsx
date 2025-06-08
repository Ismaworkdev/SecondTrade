import React from 'react'
import {useBuscar} from '../hooks/useBuscar'
import { MiniProducto } from '../Producto/MiniProducto'
export const Buscar = () => {
    const {handelChangeBuscar ,handelSubmitBuscar , formDataBuscar , productos } = useBuscar()

  return (

   <div className="w-full">

    <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">

      
        <div className="header">
          
            <div className="header-headline flex flex-col items-center justify-center pt-24 text-center">
                <h1 className="  text-3xl text-gray-900">Busca productos de varias categorias en SecondTrade </h1>
                
            </div>

            
            <div className="box pt-6">
                <div className="box-wrapper">

                    <form noValidate onSubmit={handelSubmitBuscar} className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                      <button type='submit'  className="outline-none focus:outline-none">
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000000" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>   
                    

                      </button>
                       
                      <input 
                      type="search" 
                      name="string" 
                      value={formDataBuscar.string}
                      onChange={handelChangeBuscar}
                      placeholder="Buscar producto"
                      className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"/>
                   

                      <div className="select">
                        <select 
                        name="Categoria" 
                        className="text-sm outline-none focus:outline-none bg-transparent w-2x"
                        value={formDataBuscar.Categoria}
                        onChange={handelChangeBuscar}
                        >
                        
                        <option value="Todos">Todos</option>
                        <option value="Electrónica">Electrónica</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Hogar">Hogar</option>
                        <option value="Deporte">Deporte</option>
                        <option value="Juguete">Juguete</option>
                        <option value="Libros">Libro</option>
                        <option value="Vehiculo">Vehiculo</option>
                            <option value="Material">Material</option>
                            <option value="Otros">Otros</option>
                         </select>
                      
                      </div>
                    </form>
                  
                </div>
            </div>

 

        </div>

    </div>
{productos && (
  <div className={productos.length == 0 ?   `` : `w-full max-w-[1200px] mx-auto p-6 rounded-2xl shadow-md mt-10`}>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {productos.map((producto, index) => (
        <MiniProducto key={index} producto={producto} />
      ))}
    </div>
  </div>
)}

</div>

  )
}
