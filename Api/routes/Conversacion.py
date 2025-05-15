from fastapi import APIRouter , HTTPException , Response , Depends
from config.db import conexion
from models.Conversacion import  Conversacion as ConversacionModel
from schemas.Conversacion import Conversacion as ConversacionSchema
from controllers.Conversacion import ConversacionController
from .auth import postUser as auth_postUser , get_current_user
Conversacion = APIRouter()

route = APIRouter()
namespace = "Conversacion"



@route.post("/")
def postConversacion( id_producto: int , current_user : dict = Depends(get_current_user)):
    return ConversacionController.postConversacion( id_producto , current_user) 

@route.delete("/")
def deleteConversacion( IDConversacion: int , current_user : dict = Depends(get_current_user)):
    return ConversacionController.deleteConversacion( IDConversacion , current_user) 