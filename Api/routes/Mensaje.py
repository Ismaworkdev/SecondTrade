
from fastapi import APIRouter
from config.db import conexion
from models.Mensaje import Mensaje as MensajeModel
Mensaje = APIRouter()

@Mensaje.get("/Mensaje")
def getMensaje():
    return conexion.execute(MensajeModel.select()).fetchall()