from fastapi import APIRouter , HTTPException
from config.db import conexion
from models.Conversacion import  Conversacion as ConversacionModel
from schemas.Conversacion import Conversacion as ConversacionSchema
from controllers.Conversacion import ConversacionController
Conversacion = APIRouter()

route = APIRouter()
namespace = "Conversacion"



@route.post("/")
def postConversacion(id_comprador: int, id_producto: int):
    return ConversacionController.postConversacion(id_comprador, id_producto) 