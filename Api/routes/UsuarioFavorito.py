from fastapi import APIRouter
from config.db import conexion
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel
UsuarioFavorito = APIRouter()

@UsuarioFavorito.get("/UsuarioFavorito")
def getUsuarioFavorito():
    return conexion.execute(UsuarioFavoritoModel.select()).fetchall()