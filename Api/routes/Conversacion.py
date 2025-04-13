from fastapi import APIRouter
from config.db import conexion
from models.Conversacion import  Conversacion as ConversacionModel
Conversacion = APIRouter()

@Conversacion.get("/Conversacion")
def getConversacion():
    return conexion.execute(ConversacionModel.select()).fetchall()
