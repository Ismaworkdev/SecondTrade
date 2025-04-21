from config.db import conexion
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import Response


class UsuarioFavoritoController:
    
    def getUsuarioFavorito(IDUsuario: int):
      resul = conexion.execute(UsuarioFavoritoModel.select().where(UsuarioFavoritoModel.c.IDUsuario == IDUsuario)).fetchall()
      lista = [dict(row._mapping) for row in resul]
      return lista
  
    def postUsuarioFavorito(usuarioFavorito):
        new_usuarioFavorito = {
            "IDUsuario": usuarioFavorito.IDUsuario,
            "IDProducto": usuarioFavorito.IDProducto,
        }
        try:
            conexion.execute(UsuarioFavoritoModel.insert().values(new_usuarioFavorito))
            conexion.commit()
            return  Response(status_code=HTTP_200_OK , content={"message": "Usuario Favorito creado correctamente"})
        except Exception as e:
            
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al crear el Usuario Favorito"})
        
        
    def deleteUsuarioFavorito(usuarioFavorito):
        try:
            conexion.execute(UsuarioFavoritoModel.delete().where(
                UsuarioFavoritoModel.c.IDUsuario == usuarioFavorito.IDUsuario,
                UsuarioFavoritoModel.c.IDProducto == usuarioFavorito.IDProducto
            ))
            conexion.commit()
            return Response(status_code=HTTP_200_OK , content={"message": "Usuario Favorito eliminado correctamente"})
        except Exception as e:
            print(e)
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar el Usuario Favorito"})   