from fastapi import APIRouter
from config.db import conexion
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel
from schemas.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoSchema
from controllers.UsuarioFavorito import UsuarioFavoritoController 
route = APIRouter()
namespace = "UsuarioFavorito"

@route.get("/{IDUsuario}")
def getUsuarioFavorito(IDUsuario: int):
    return UsuarioFavoritoController.getUsuarioFavorito(IDUsuario)

@route.post("/")
def postUsuarioFavorito(usuarioFavorito: UsuarioFavoritoSchema):
    return UsuarioFavoritoController.postUsuarioFavorito(usuarioFavorito)

@route.delete("/")
def deleteUsuarioFavorito(usuarioFavorito: UsuarioFavoritoSchema):
    return UsuarioFavoritoController.deleteUsuarioFavorito(usuarioFavorito)

