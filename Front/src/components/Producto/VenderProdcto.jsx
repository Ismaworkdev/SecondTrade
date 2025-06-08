import React from 'react'
import { EditImageProducto } from './EditImageProducto'
import { useVenderProducto } from '../hooks/useVenderProducto'
import { TaskHecho } from '../../Pages/TaskHecho'

export const VenderProdcto = () => {

    const {formDataVenderProducto , errors, handelChangeVenderProducto , texterrors , handelSubmitVenderProduct , IDProducto , im , done} = useVenderProducto()

   
  return (
    <div className="flex justify-center mt-0  items-center pt-0 w-full bg-whitelg:py-24">
      <div className="container min-w-[1000px] my-8 px-4 lg:px-20">
     {done != null && done == true && <TaskHecho mensaje="¡Producto subido correctamente! " />}
          <div className="w-full max-h-[1100px] flex items-center justify-center bg-white mt-10 p-12 my-4 md:px-12 lg:w-full mr-auto rounded-2xl shadow-2xl">
            <div className="w-full">
              <div className="flex">
                <h1 className="font-bold pt-10 text-center lg:text-left text-blue-900 text-4xl">
                    
                                        Vender Producto </h1>
                                </div>
    
                                <div>
                                    <EditImageProducto IDEP = {IDProducto}  />
                                </div>
                             
                               <form onSubmit={handelSubmitVenderProduct} noValidate >    
                             
    
                           <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5 w-full">
    
                                  <div>
                                        <input 
                                            name="Titulo"
                                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Titulo ? `border-4 border-red-400` : ``}`}
    
                                            
                                            type="text" 
                                            placeholder="Titulo*"
                                            value={formDataVenderProducto.Titulo}
                                            onChange={handelChangeVenderProducto}
                                            
                                         
                                            
                                        />
                                       
                                            <p className="text-red-500 text-sm">{texterrors.Titulo ? 'Titulo  inválido  , maximo 50 caracteres' : ''}</p>
                                        
                                    </div>
                                     <div>
                                      <textarea
                                        name="Descripcion"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Descripcion ? `border-4 border-red-400` : ``}`}
                                        placeholder="Descripción del Producto*"
                                        value={formDataVenderProducto.Descripcion}
                                         onChange={handelChangeVenderProducto}
                                        />
                                       
                                            <p className="text-red-500 text-sm">{texterrors.Descripcion ? 'Descripcion  inválido , maximo 640 caracteres' : ''}</p>
                                        
                                    </div>
                                    <div>
                                        <input 
                                            name="Precio"
                                            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Precio ? `border-4 border-red-400` : ``}`}
    
    
                                            type="number" 
                                            placeholder="Precio*"
                                              value={formDataVenderProducto.Precio}
                                               onChange={handelChangeVenderProducto}
                                         
                                            
                                        />
                                       
                                            <p className="text-red-500 text-sm">{texterrors.Precio ? 'Precio inválido maximo 200000€ ' : ''}</p>
                                        
                                    </div>
                                    <div>
                                                        <select
                                                        name="Categoria"
                                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Categoria ? `border-4 border-red-400` : ``}`}
                                                        value={formDataVenderProducto.Categoria}
                                                         onChange={handelChangeVenderProducto}
                                                        >
                                                                                                          
                                                            <option value='' >
                                                              
                                                            </option>
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
    
                                       
                                            <p className="text-red-500 text-sm">{texterrors.Categoria ? 'Categoria inválido  ' : ''}</p>
                                        
                                    </div>
    
    
    
                                    
                                    
    
                                 
                                  <p className="text-red-500 text-sm">{  !im ? 'Debes subir al menos una Imagen del producto ' : ''}</p>
                            </div>
    
                            <div className="my-2">
                                <button  type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 mb-5 rounded-lg w-full 
                                        focus:outline-none focus:shadow-outline">
                                    Subir Producto
                                </button>
                                </div>
                                    </form>
                               
                            
                                </div>
                        </div>
                    
                   
                    </div>
                </div>
  )
}
