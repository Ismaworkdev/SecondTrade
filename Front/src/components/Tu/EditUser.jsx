import { useState, React, useEffect, use } from 'react';
import { Navigate, useNavigate  , Link  } from "react-router-dom";
import { MapContainer, TileLayer, useMapEvents, Marker  } from "react-leaflet";
import { Eye, EyeOff } from 'lucide-react';
import "leaflet/dist/leaflet.css";
import { TaskHecho } from '../../Pages/TaskHecho';
import L from "leaflet";
import {useEditUser} from '../hooks/useEditUser';

export const EditUser = () => {
             const {   
        formDataEdit,
        setformDataEdit ,
        handleChangeEdit ,
        handleSubmitEdit ,
        texterrors,
        settextErrors, 
        write ,
        setPosition,
        position,
    address, 
    seaddress , 
    getAdress , 
    errors, setErrors , 
    isregistered ,
        putEdit,  done   , showPassword, setShowPassword   } = useEditUser();
                     delete L.Icon.Default.prototype._getIconUrl;
                     L.Icon.Default.mergeOptions({
                       iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                       iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                       shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                     });
                     
                     const  LocationMarker = ()=> {
                       useMapEvents({
                         click(event) {
                           const coords = event.latlng;
                           setPosition(coords);
                           
                         }
                       });
                     
                       return position === null ? null : (
                         <Marker position={position}>
                         </Marker>
                       );
                     }
             
                     useEffect(() => {
                         
                         getAdress()
                        
                        
                     }, [position]);


  return (
 

<div className="flex justify-center items-center mt-8 w-full  py-12 lg:py-24">
    {done != null && done == true && <TaskHecho mensaje="¡Cambios Guardados Correctamente! " />}
  <div className="w-full max-w-7xl mx-auto my-8 px-4 lg:px-8" data-aos="zoom-in">
    <form noValidate onSubmit={handleSubmitEdit}>
      <div className="w-full bg-white p-8 my-4 md:px-12 lg:px-20 rounded-2xl shadow-2xl">
        <div className="flex mb-6">
          <h1 className="font-bold text-center lg:text-left text-blue-900 text-4xl w-full">
            Editar Usuario
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5 w-full">
          <div className="w-full h-[400px] md:h-[500px]">
            <MapContainer
              center={[39.88576693369136, -4.456524558827891]}
              zoom={13}
              className="w-full h-full  z-0"
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
                     
            </div>
                         

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <input 
                                        name="Nombre" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Nombre ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Nombre*" 
                                        value={formDataEdit.Nombre}
                                        onChange={handleChangeEdit}
                                  
                                    />
                                  
                                         <p className="text-red-500 text-sm">{!texterrors.Nombre ? 'Nombre invalido ' : ''}</p>
                                    
                                </div>
                                
                                <div>
                                    <input 
                                        name="Apellidos" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Apellidos ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Apellidos*"
                                        value={formDataEdit.Apellidos}
                                        onChange={ handleChangeEdit}
                                     
                                    />
                                   
                                       <p className="text-red-500 text-sm">{!texterrors.Apellidos ? 'Apellidos invalido ' : ''}</p>
                                    
                                </div>
                                <div className='relative'>
                                    <input 
                                        name="Contrasena" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 pr-7 rounded-lg focus:outline-none focus:shadow-outline ${errors.Contrasena ? `border-4 border-red-400` : ``}`}
                                         type={showPassword ? 'text' : 'password'}
                                        placeholder="Contraseña*"
                                        value={formDataEdit.Contrasena}
                                        onChange={ handleChangeEdit}
                                        
                                    />
                                    
                                       <p className="text-red-500 text-sm">{!texterrors.Contrasena ? 'Contraseña invalido ' : ''}</p>
                                          <div className="absolute top-5 right-1 cursor-pointer text-black hover:text-gray-800 bg-gray-100"
                                        onClick={() => setShowPassword(!showPassword)}
                                      >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                      </div>
                                </div>


                                <div>
                                    <input 
                                        name="Gmail"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Gmail ? `border-4 border-red-400` : ``}`}
                                        type="email" 
                                        placeholder="Gmail*"
                                        value={formDataEdit.Gmail}
                                        onChange={ handleChangeEdit}
                                        
                                    />
                                   
                                <p className="text-red-500 text-sm">{!texterrors.Gmail ? 'Gmail invalido ' : ''}</p>
                                 <p className="text-gray-500 text-[90%]">*Si Cambias el Gmail debes volver a Iniciar sesion *</p>

                                    
                                </div>

                                
                                <div>
                                    <input 
                                        name="Telefono"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Telefono ? `border-4 border-red-400` : ``}`}
                                        type="number" 
                                        placeholder="Telefono*"
                                        value={formDataEdit.Telefono}
                                        onChange={ handleChangeEdit}
                                        
                                    />
                                   
                                     <p className="text-red-500 text-sm">{!texterrors.Telefono ? 'Telefono invalido ' : ''}</p>

                                    
                                </div>

                                <div>
                                    <input
                                        name="CiudadPueblo" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.CiudadPueblo ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Ciudad / Pueblo*"
                                        value={address.CiudadPueblo}
                                        onChange={ handleChangeEdit}
                                       
                                        
                                    />
                                      <p className="text-red-500 text-sm">{!texterrors.CiudadPueblo ? 'Ciudad / Pueblo  invalidos selecionalo en el mapa  ' : ''}</p>

                                    
                                </div>
                                 <div>
                                    <input
                                        name="Provincia" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Provincia ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Region*"
                                        value={address.Provincia}
                                        onChange={ handleChangeEdit}
                                       
                                        
                                    />
                                    
                                     <p className="text-red-500 text-sm">{!texterrors.Provincia ? 'Region  invalida selecionalo en el mapa  ' : ''}</p>

                                    
                                </div>


                                 <div>
                                    <input
                                        name="Fecha_Nacimiento" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Fecha_Nacimiento ? `border-4 border-red-400` : ``}`}
                                        type="Date" 
                                        placeholder="Fecha Nacimiento*"
                                        value={formDataEdit.Fecha_Nacimiento}
                                        onChange={ handleChangeEdit}
                                       
                                        
                                    />
                                    
                                      <p className="text-red-500 text-sm">{!texterrors.Fecha_Nacimiento ? 'Fecha  invalido ' : ''}</p>

                                    
                                </div>
                               <div className="w-full border pb-5 border-black border-dashed rounded-xl p-2 pt-6 mb-10 col-span-2">
                                 <label className="font-bold text-blue-900 hover:text-blue-700">
                                         Subir Imagen de Perfil
                                    <input
                                        name="ImgPerfil"
                                         className={`w-full hidden bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.ImgPerfil ? `border-4 border-red-400` : ``}`}
                                        type="file"
                                        accept="image/*" 
                                        placeholder="Imagen de Perfil*"
                                        
                                        onChange={ handleChangeEdit}
    
                                    />
                                                                 </label> 

                                    <p className="text-red-500 text-sm">{!texterrors.ImgPerfil ? 'Imagen de Perfil  invalido ' : ''}</p>

                                    
                                </div>

                        </div>
                    </div>

                        <div className="my-2 ">
                        
                            <button type="submit"  className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Editar Usuario  
                            </button>
                            <p className="text-red-500 text-sm">{!texterrors.compatible ? 'Vuelve a escribir la contraseña' : ''}</p>
                             <p className="text-red-500 text-sm">{!texterrors.existe ? 'Este Gmail ya esta Registrado ' : ''}</p>
                        </div>
                    </div>
                    </form>

                </div>
                <div>

                </div>
             
            </div>
  )
}

