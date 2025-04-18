from config.db import conexion
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel



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
            return {"message": "Usuario Favorito agregado correctamente"}
        except Exception as e:
            print(e)
            return {"message": "Error al agregar Usuario Favorito"}
        
        
    def deleteUsuarioFavorito(usuarioFavorito):
        try:
            conexion.execute(UsuarioFavoritoModel.delete().where(
                UsuarioFavoritoModel.c.IDUsuario == usuarioFavorito.IDUsuario,
                UsuarioFavoritoModel.c.IDProducto == usuarioFavorito.IDProducto
            ))
            conexion.commit()
            return {"message": "Usuario Favorito eliminado correctamente"}
        except Exception as e:
            print(e)
            return {"message": "Error al eliminar Usuario Favorito"}    