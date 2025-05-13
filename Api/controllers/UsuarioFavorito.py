from config.db import conexion
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import Response
from .Usuario import UsuarioController
from fastapi.responses import JSONResponse

class UsuarioFavoritoController:
    
    def getUsuarioFavorito(current_user : dict):
        if UsuarioController.getGmailUser(current_user["Gmail"]) == {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
        else: 
                resul = conexion.execute(UsuarioFavoritoModel.select().where(UsuarioFavoritoModel.c.IDUsuario == IDUsuario)).fetchall()
                lista = [dict(row._mapping) for row in resul]
                return lista
  
    def postUsuarioFavorito(usuarioFavorito , current_user : dict):
         if UsuarioController.getGmailUser(current_user["Gmail"]) == {} :
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
         else:
            new_usuarioFavorito = {
                "IDUsuario": current_user["id"],
                "IDProducto": usuarioFavorito.IDProducto,
            }
            try:
                conexion.execute(UsuarioFavoritoModel.insert().values(new_usuarioFavorito))
                conexion.commit()
                return  JSONResponse(status_code=HTTP_200_OK , content={"message": "Usuario Favorito creado correctamente"})
            except Exception as e:
                
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al crear el Usuario Favorito"})
            
        
    def deleteUsuarioFavorito(usuarioFavorito , current_user : dict):
        if UsuarioController.getGmailUser(current_user["Gmail"]) == {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
        else:
            
            try:
                conexion.execute(UsuarioFavoritoModel.delete().where(
                    UsuarioFavoritoModel.c.IDUsuario == current_user["id"],
                    UsuarioFavoritoModel.c.IDProducto == usuarioFavorito.IDProducto
                ))
                conexion.commit()
                return JSONResponse(status_code=HTTP_200_OK , content={"message": "Usuario Favorito eliminado correctamente"})
            except Exception as e:
                print(e)
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar el Usuario Favorito"})   