import { useState, React, useEffect, use } from 'react';
import { Navigate, useNavigate  , Link  } from "react-router-dom";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRegister } from '../hooks/useRegister';
import defaultUser from '../../assets/default_user.jpg';


export const Register = () => {
         const {   
     formDataRegister,
    setFormDataRegister,
    handleChangeRegister ,
    handleSubmitRegister ,
    texterrors,
    settextErrors, 
    write ,
    setPosition,
    position,
    address, 
    seaddress , 
    getAdress , 
    errors, 
    setErrors , 
    isregistered ,
    postRegister
         } = useRegister();

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
  <div className="w-full max-w-7xl mx-auto my-8 px-4 lg:px-8" data-aos="zoom-in">
    <form noValidate onSubmit={handleSubmitRegister}>
      <div className="w-full bg-white p-8 my-4 md:px-12 lg:px-20 rounded-2xl shadow-2xl">
        <div className="flex mb-6">
          <h1 className="font-bold text-center lg:text-left text-blue-900 text-4xl w-full">
            Registrarse en SecondTrade
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
                                        value={formDataRegister.Nombre}
                                        onChange={handleChangeRegister}
                                        //onKeyUp={clearErrors}
                                    />
                                  
                                         <p className="text-red-500 text-sm">{!texterrors.Nombre ? 'Nombre invalido ' : ''}</p>
                                    
                                </div>
                                
                                <div>
                                    <input 
                                        name="Apellidos" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Apellidos ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Apellidos*"
                                        value={formDataRegister.Apellidos}
                                        onChange={ handleChangeRegister}
                                     
                                    />
                                   
                                       <p className="text-red-500 text-sm">{!texterrors.Apellidos ? 'Apellidos invalido ' : ''}</p>
                                    
                                </div>
                                <div>
                                    <input 
                                        name="Contrasena" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Contrasena ? `border-4 border-red-400` : ``}`}
                                        type="password" 
                                        placeholder="Contraseña*"
                                        value={formDataRegister.Contrasena}
                                        onChange={ handleChangeRegister}
                                        //onKeyUp={clearErrors}
                                    />
                                    
                                       <p className="text-red-500 text-sm">{!texterrors.Contrasena ? 'Contraseña invalido ' : ''}</p>
                                    
                                </div>
                                <div>
                                    <input 
                                        name="ConfirmarContrasena" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.ConfirmarContrasena ? `border-4 border-red-400` : ``}`}
                                        type="password" 
                                        placeholder="Confirmar Contraseña*"
                                        value={formDataRegister.ConfirmarContrasena}
                                        onChange={ handleChangeRegister}
                                        //onKeyUp={clearErrors}
                                    />
                                    
                                        <p className="text-red-500 text-sm">{!texterrors.ConfirmarContrasena ? 'Confirmar Contraseña invalido ' : ''}</p>
                                    
                                </div>

                                <div>
                                    <input 
                                        name="Gmail"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Gmail ? `border-4 border-red-400` : ``}`}
                                        type="email" 
                                        placeholder="Gmail*"
                                        value={formDataRegister.Gmail}
                                        onChange={ handleChangeRegister}
                                        
                                    />
                                   
                                <p className="text-red-500 text-sm">{!texterrors.Gmail ? 'Gmail invalido ' : ''}</p>

                                    
                                </div>

                                
                                <div>
                                    <input 
                                        name="Telefono"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Telefono ? `border-4 border-red-400` : ``}`}
                                        type="number" 
                                        placeholder="Telefono*"
                                        value={formDataRegister.Telefono}
                                        onChange={ handleChangeRegister}
                                        
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
                                        onChange={ handleChangeRegister}
                                       
                                        
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
                                        onChange={ handleChangeRegister}
                                       
                                        
                                    />
                                    
                                     <p className="text-red-500 text-sm">{!texterrors.Provincia ? 'Region  invalida selecionalo en el mapa  ' : ''}</p>

                                    
                                </div>


                                 <div>
                                    <input
                                        name="Fecha_Nacimiento" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Fecha_Nacimiento ? `border-4 border-red-400` : ``}`}
                                        type="Date" 
                                        placeholder="Fecha Nacimiento*"
                                        value={formDataRegister.Fecha_Nacimiento}
                                        onChange={ handleChangeRegister}
                                       
                                        
                                    />
                                    
                                      <p className="text-red-500 text-sm">{!texterrors.Fecha_Nacimiento ? 'Fecha  invalido ' : ''}</p>

                                    
                                </div>
                               <div className="w-full border border-black border-dashed rounded-xl p-2 pt-6 mb-10">
                                      <label className="font-bold text-blue-900 hover:text-blue-700">
                                         Subir Imagen de Perfil
                                    <input
                                        name="ImgPerfil"
                                        className={`w-full hidden bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.ImgPerfil ? `border-4 border-red-400` : ``}`}
                                        type="file"
                                        accept="image/*" 
                                        placeholder="Imagen de Perfil*"
                                      
                                        onChange={ handleChangeRegister}
                                    />

                                     </label> 
   
    

                                    
                                    <p className="text-red-500 text-sm">{!texterrors.ImgPerfil ? 'Imagen de Perfil  invalido ' : ''}</p>

                                    
                                </div>

                        </div>
                    </div>

                        <div className="my-2 ">
                        
                            <button type="submit"  className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Registrarse 
                            </button>
                            <p className="text-red-500 text-sm">{!texterrors.compatible ? 'Vuelve a escribir la contraseña' : ''}</p>
                             <p className="text-red-500 text-sm">{!texterrors.existe ? 'Este Gmail ya esta Registrado ' : ''}</p>
                            <p className="text-sm text-center mt-4">
                                Ya tienes cuenta? 
                                <Link to="/login" className="font-bold text-blue-900 hover:text-blue-700"> Inicia Sesion</Link>
                            </p>
                        </div>
                    </div>
                    </form>
                    <div className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto lg:ml-[1100px] bg-blue-900 rounded-2xl">
                        <div className="flex flex-col text-white">     
                            <div className="flex my-4 w-2/3 lg:w-3/4">
                                <div className="flex flex-col">
                                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Oficinas Centrales </h2>
                                    <p className="text-gray-400">Carpio de tajo , Toledo </p>
                                </div>
                            </div>
                            
                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                <i className="fas fa-phone-alt pt-2 pr-2" />
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="text-2xl"> Numero de Soporte </h2>
                                    <p className="text-gray-400">Tel: 666999555</p>
                                
                                    <div className='mt-5'>
                                        <h2 className="text-2xl">Gmail de Soporte </h2>
                                        <a href="mailto:secondtradeapp@gmail.com" className="text-gray-400">secondtradeapp@gmail.com</a>
                                    </div>
                            
                                </div>
                            </div>
                            
                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8 mx-1 text-center pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8 mx-1 text-center pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
             
            </div>
  )
}
