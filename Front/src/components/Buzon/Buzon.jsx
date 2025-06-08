import React from 'react'
import { Conversacion } from './Conversacion'
import { Chat } from './Chat'
import { Outlet } from 'react-router-dom'
export const Buzon = () => {
  return (
   <div className='flex w-full h-[90vh] justify-between bg-gray-400 p-4 rounded-2xl shadow-md'>
  <Conversacion />
  <Outlet />
</div>

  )
}
