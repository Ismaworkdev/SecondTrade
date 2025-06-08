import React from 'react'
import {useConversacion} from '../hooks/useConversacion'
import { Link } from 'react-router-dom'
import {MiniConver} from './MiniConver'
export const Conversacion = () => {
 const {conver} = useConversacion()
 if(conver.length == 0){
 return <div className='aling-center w-full justify-center flex'>
  <h3>No hay Conversaciones por ahora </h3>
 </div>
 }

  return (
<div className='pt-4 w-[40%] border-r-2 border-black-800 pr-4'>
                {conver.map((c, index) => {
                    return <MiniConver IDEP = {c.IDProducto} IDEC = {c.IDConversacion}/>
                    })}

    </div>

  )
}
