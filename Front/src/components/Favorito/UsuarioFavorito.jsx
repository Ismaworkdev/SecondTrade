import React from 'react'
import { UserMini } from '../Producto/UserMini'
import { useUsuarioFavorito } from '../hooks/useUsuarioFavorito'
export const UsuarioFavorito = () => {
  const {usuarios} = useUsuarioFavorito()
       if(usuarios.length == 0){
        
 return <div className='aling-center w-full justify-center flex'>
  <h3>No hay Usuarios Favoritos  por ahora </h3>
 </div>
 }

  return (
    <div>
                    {usuarios.map((usuario, index) => {
                        return <UserMini  idU={usuario.IDUsuarioGustado} /> 
                        })}
    </div>
  )
}
