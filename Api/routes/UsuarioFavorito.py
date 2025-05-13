from fastapi import APIRouter , Response, Depends
from config.db import conexion
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel
from schemas.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoSchema
from controllers.UsuarioFavorito import UsuarioFavoritoController 
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "UsuarioFavorito"

@route.get("/")
def getUsuarioFavorito(current_user: dict = Depends(get_current_user)):
    return UsuarioFavoritoController.getUsuarioFavorito(current_user)

@route.post("/")
def postUsuarioFavorito(usuarioFavorito: UsuarioFavoritoSchema , current_user: dict = Depends(get_current_user)):
    return UsuarioFavoritoController.postUsuarioFavorito(usuarioFavorito , current_user)

@route.delete("/")
def deleteUsuarioFavorito(usuarioFavorito: UsuarioFavoritoSchema , current_user: dict = Depends(get_current_user)):
    return UsuarioFavoritoController.deleteUsuarioFavorito(usuarioFavorito , current_user)

