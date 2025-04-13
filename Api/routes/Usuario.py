
from fastapi import APIRouter
from config.db import conexion
from models.Usuario import Usuario as UsuarioModel
Usuario = APIRouter()

@Usuario.get("/Usuario")
def get_Users():
    return conexion.execute(UsuarioModel.select()).fetchall()