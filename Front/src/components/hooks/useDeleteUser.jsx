import React from 'react'
import { useLogout } from './useLogout'

export const useDeleteUser = () => {
    const { logout } = useLogout()
    let token = sessionStorage.getItem('token');
    const deleteuser = async () => {
        try {
               if (token) {
                           //http://127.0.0.1:8000/usuario/
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
  return {            deleteuser}
}

