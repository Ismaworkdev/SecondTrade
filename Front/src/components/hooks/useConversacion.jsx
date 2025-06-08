import React, { useState , useContext  } from 'react'
import { useEffect } from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado'

export const useConversacion = () => {
    
    const {userLogeado , setact , act , conver , setconver} = useContext(UserLogeadoContext)
   
     let token = sessionStorage.getItem('token')

    const getConvers = async () =>{

    const data = await fetch("http://127.0.0.1:8000/conversacion/",{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`

            }
    })
    .then((resul) => resul.json())

    setconver(data)
 
  } 





  useEffect(()=>{
getConvers()

  },[act ])
  
    return{conver , act , setact , getConvers}
}
