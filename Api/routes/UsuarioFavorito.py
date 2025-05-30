from fastapi import APIRouter , Response, Depends
from sqlalchemy.orm import Session
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel
from schemas.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoSchema
from controllers.UsuarioFavorito import UsuarioFavoritoController 
from config.db import get_db
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "UsuarioFavorito"

@route.get("/")
def getUsuarioFavorito(current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return UsuarioFavoritoController.getUsuarioFavorito(current_user , db)

@route.post("/")
def postUsuarioFavorito(usuarioFavorito: UsuarioFavoritoSchema , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return UsuarioFavoritoController.postUsuarioFavorito(usuarioFavorito , current_user , db)

@route.delete("/")
def deleteUsuarioFavorito(usuarioFavorito: UsuarioFavoritoSchema , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return UsuarioFavoritoController.deleteUsuarioFavorito(usuarioFavorito , current_user , db)

