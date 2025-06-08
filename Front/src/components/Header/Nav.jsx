import {useContext}from 'react';
import { Link } from 'react-router-dom';
import { UserLogeadoContext } from '../Context/UserLogeado';
export const Nav = () => {
  const { userLogeado } = useContext(UserLogeadoContext);
 
  
  return (
    <>
  {userLogeado.IDUsuario !== 1 ? (
   
    <>
         <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900 flex align-middle fill-black hover:fill-blue-800" to="/home/buzon">
    <p className='align-middle p-1.5'>Buzón</p> <svg className='w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z"/></svg>
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900 flex fill-black hover:fill-blue-800" to="/home/favorito">
    <p className='align-middle p-1.5'>Favoritos</p> <svg className='w-9' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900 flex fill-black hover:fill-blue-800" to="/home/user">
    <p className='align-middle pt-3 pr-1.5'> Tù </p> <img  className="w-16 h-16 rounded-full object-cover"  src={`data:image/jpeg;base64,${userLogeado.ImgPerfil}`} alt="Perfil" />

    </Link>
    <Link className="text-white bg-blue-900 hover:bg-blue-800  items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl flex" to="/home/vender">
    <p className='align-middle p-1.5'>Vender</p> <svg className=' w-8'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
    </Link>
    </>
  ) : (
    
    <>
     <>

    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900 flex fill-gray-500 hover:fill-blue-800" to="/home/administrar">
    <p className='align-middle p-1.5'>Administrar</p> <svg className=' w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7L288 480l9.4 0L512 480c17.7 0 32-14.3 32-32s-14.3-32-32-32l-124.1 0L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416l-9.4 0-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"/></svg>
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900 flex fill-black hover:fill-blue-800" to="/home/user">
    <p className='align-middle pt-3 pr-1.5'> Tù </p> <img  className="w-16 h-16 rounded-full object-cover"  src={`data:image/jpeg;base64,${userLogeado.ImgPerfil}`} alt="Perfil" />

    </Link>
 
    </>
  </>
  )}
    </>
  )
}
