import React from 'react'
import { useParams } from 'react-router-dom'
import { useOneProduct } from '../hooks/useOneProduct'
import { useEditProducto } from '../hooks/useEditProducto'
import { EditImageProducto } from './EditImageProducto'
import { TaskHecho } from '../../Pages/TaskHecho'
export const EditProducto = () => {
     const {idProducto} = useParams()
      const {product} = useOneProduct({idProducto})
   
    const {formDataEditProducto ,handelChangeRditProducto , errors , handelSubmitEditProduct , texterrors , im , done} = useEditProducto({ product})
 
  
     
  return (
<div className="flex justify-center items-center mt-18 w-full bg-white py-12 lg:py-24">
  <div className="container min-w-[1000px] my-8 px-4 lg:px-20" data-aos="zoom-in">
   {done != null && done == true && <TaskHecho mensaje="¡Producto editado correctamente! " />}
      <div className="w-full max-h-[1100px] flex items-center justify-center bg-white p-12 my-4 md:px-12 lg:w-full mr-auto rounded-2xl shadow-2xl">
        <div className="w-full">
          <div className="flex">
            <h1 className="font-bold text-center lg:text-left text-blue-900 text-4xl">
                
                                    Editar Producto </h1>
                            </div>

                            <div>
                                <EditImageProducto IDEP = {idProducto}/>
                            </div>
                         
                           <form noValidate onSubmit={handelSubmitEditProduct} >    
                         

                       <div className="grid grid-cols-1 md:grid-cols-1 gap-5 mt-5 w-full">

                              <div>
                                    <input 
                                        name="Titulo"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Titulo ? `border-4 border-red-400` : ``}`}

                                        
                                        type="text" 
                                        placeholder="Titulo*"
                                        value={formDataEditProducto.Titulo}
                                        onChange={handelChangeRditProducto}
                                        
                                     
                                        
                                    />
                                   
                                        <p className="text-red-500 text-sm">{texterrors.Titulo ? 'Titulo  inválido  , maximo 50 caracteres' : ''}</p>
                                    
                                </div>
                                 <div>
                                  <textarea
                                    name="Descripcion"
                                    className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Descripcion ? `border-4 border-red-400` : ``}`}
                                    placeholder="Descripción del Producto*"
                                    value={formDataEditProducto.Descripcion}
                                     onChange={handelChangeRditProducto}
                                    />
                                   
                                        <p className="text-red-500 text-sm">{texterrors.Descripcion ? 'Descripcion  inválido , maximo 640 caracteres' : ''}</p>
                                    
                                </div>
                                <div>
                                    <input 
                                        name="Precio"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Precio ? `border-4 border-red-400` : ``}`}


                                        type="number" 
                                        placeholder="Precio*"
                                          value={formDataEditProducto.Precio}
                                           onChange={handelChangeRditProducto}
                                     
                                        
                                    />
                                   
                                        <p className="text-red-500 text-sm">{texterrors.Precio ? 'Precio inválido maximo 200000€ ' : ''}</p>
                                    
                                </div>
                                <div>
                                                    <select
                                                    name="Categoria"
                                                    className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Categoria ? `border-4 border-red-400` : ``}`}
                                                    value={formDataEditProducto.Categoria}
                                                     onChange={handelChangeRditProducto}
                                                    >
                                                  
                                                        <option value={product.Categoria} >
                                                         {`${product.Categoria} * Categoria actual  del producto * `}
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
                            <button  type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Actualizar Producto
                            </button>
                            </div>
                                </form>
                           
                        
                            </div>
                    </div>
                
               
                </div>
            </div>
  )
}
