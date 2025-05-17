import { useState } from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import {Header} from './components/Header/Header'

export const  App= ()=> {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header/>} />

    </Routes>

    </BrowserRouter>
   
  
  )
}


