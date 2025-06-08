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

@route.get("/")
def getConversaciones(  current_user : dict = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return ConversacionController.getConversaciones(  current_user , db) 

@route.get("/{id}")
def getConversacion( id : int , current_user : dict = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return ConversacionController.getConversacion( id , current_user , db) 

@route.get("/max/")
def getMaxid(   current_user : dict = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return ConversacionController.getMaxid( current_user , db) 

@route.get("/exist/{idCon}")
def getexist( idCon : int ,   current_user : dict = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return ConversacionController.getexist( idCon , current_user , db) 


@route.post("/")
def postConversacion( id_producto: int , current_user : dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ConversacionController.postConversacion( id_producto , current_user , db) 

@route.delete("/")
def deleteConversacion( IDConversacion: int , current_user : dict = Depends(get_current_user) ,db: Session = Depends(get_db)):
    return ConversacionController.deleteConversacion( IDConversacion , current_user , db) 