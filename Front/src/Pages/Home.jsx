import React from 'react'
import { Header } from '../components/Header/Header'

import { Outlet } from 'react-router-dom'
export const Home = () => {
  return (
    <>
    <Header/>
    <main className='flex mt-27 w-full  flex-col items-center justify-start '>
   
      <Outlet />
   
    </main>
     
    
  
    </>
  )
}
