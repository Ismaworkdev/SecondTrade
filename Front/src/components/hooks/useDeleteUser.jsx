import React, { useState } from 'react'
import { useLogout } from './useLogout'

export const useDeleteUser = () => {
    const { logout } = useLogout()
    const [isOpen , setIsOpen] = useState(false)
    let token = sessionStorage.getItem('token');
    const deleteuser = async () => {
        try {
               if (token) {
                         
            const data = await fetch(`http://127.0.0.1:8000/usuario/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then((resul)=> {
            if(resul.ok){
                logout()
            }
          })
          {
            
            
          
                
             }   }



        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
  return {            deleteuser ,isOpen , setIsOpen}
}

