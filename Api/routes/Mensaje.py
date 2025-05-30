from fastapi import APIRouter, WebSocket , Depends
from controllers.Mensaje import MensajeController
from sqlalchemy.orm import Session
from config.db import get_db
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "Mensaje"

@route.get("/")
def getMensajes(IDConversacion: int , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return MensajeController.getMensajes(IDConversacion , current_user)

@route.websocket("/ws/{IDConversacion}")
async def postMensaje(websocket: WebSocket, IDConversacion: int,  current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    await MensajeController.postMensaje(websocket, IDConversacion, current_user)
