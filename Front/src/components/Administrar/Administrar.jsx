import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Administrar = () => {
  return (
<div className='block w-full'>
      <div className='w-full flex justify-around bg-gray-400 p-4 rounded-2xl shadow-md'>
      
     <Link to={'/home/administrar/'}>
<svg className="w-10 fill-blue-900 hover:fill-blue-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z"/></svg>

        </Link>
     
<Link to={'/home/administrar/usuarios'}>
       <svg className="w-10 fill-blue-900 hover:fill-blue-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>

</Link>
    </div>

    <div className='w-full  justify-around bg-gray-400 p-6 rounded-2xl shadow-md mt-10 '>
      <Outlet/>
    </div>
</div>
  )
}