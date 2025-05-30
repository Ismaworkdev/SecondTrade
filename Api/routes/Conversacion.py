from fastapi import APIRouter , HTTPException , Response , Depends

from models.Conversacion import  Conversacion as ConversacionModel
from schemas.Conversacion import Conversacion as ConversacionSchema
from controllers.Conversacion import ConversacionController
from config.db import get_db
from sqlalchemy.orm import Session
from .auth import postUser as auth_postUser , get_current_user
Conversacion = APIRouter()
from config.db import get_db
route = APIRouter()
namespace = "Conversacion"



@route.post("/")
def postConversacion( id_producto: int , current_user : dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ConversacionController.postConversacion( id_producto , current_user , db) 

@route.delete("/")
def deleteConversacion( IDConversacion: int , current_user : dict = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return ConversacionController.deleteConversacion( IDConversacion , current_user , db) 