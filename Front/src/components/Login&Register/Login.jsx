import { useState, React, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  {UserLogeadoContext} from '../Context/UserLogeado'
import {useLogin} from '../hooks/useLogin'


export const Login = () => {
    const { handleChangeLogin, handleSubmitLogin, formDataLogin, errors, texterrors, Unauthorized } = useLogin()
;

   
  return (


            <div  className="flex  justify-center items-center mt-18 w-full bg-white  py-12 lg:py-24">
                <div className="container   mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <form  onSubmit={handleSubmitLogin}  id="RegisterForm" noValidate>
                        <div className="w-full min-h-[500px] flex items-center justify-center bg-white p-12 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                            <div>
                                                            <div className="flex">
                                <h1 className="font-bold text-center lg:text-left text-blue-900  text-4xl">Iniciar session  en SecondTrade</h1>
                            </div>
                         
                           
                         

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">

                                
                                
                                    <div>
                                    <input 
                                        name="Gmail"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Gmail ? `border-4 border-red-400` : ``}`}


                                        type="email" 
                                        placeholder="Gmail*"
                                        value={formDataLogin.Gmail}
                                        onChange={ handleChangeLogin}
                                        
                                    />
                                   
                                        <p className="text-red-500 text-sm">{!texterrors.Gmail ? 'Gmail invalido ' : ''}</p>
                                    
                                </div>
                                <div>
                                    <input 
                                        name="Contrasena" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Contrasena ? `border-4 border-red-400` : ``}`}
                                        type="password" 
                                        placeholder="Contraseña*"
                                        value={formDataLogin.Contrasena}
                                        onChange={ handleChangeLogin}
                                      
                                    />
                                    
                                        <p className="text-red-500 text-sm">{!texterrors.Contrasena ? 'Contraseña invalida ' : ''}</p>
                                       
                                    
                                </div>
                              
                        </div>

                        <div className="my-2">
                            <button  type="submit" id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Iniciar  Sesion 
                            </button>
                             <p className="text-red-500 text-sm">{!Unauthorized ? 'Usuario o contraseña incorrecta  ' : ''}</p>
                            <p className="text-sm text-center mt-4">
                                No tienes cuenta? 
                                <Link to="/Register" className="font-bold text-blue-900 hover:text-blue-700"> Registrate</Link>
                            </p>
                        </div>
                            </div>
                    </div>
                    </form>
                    <div className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
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
            </div>
  )
}
