from fastapi import APIRouter, WebSocket , Depends
from controllers.Mensaje import MensajeController
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "Mensaje"

@route.get("/")
def getMensajes(IDConversacion: int , current_user: dict = Depends(get_current_user)):
    return MensajeController.getMensajes(IDConversacion , current_user)

@route.websocket("/ws/{IDConversacion}")
async def postMensaje(websocket: WebSocket, IDConversacion: int,  current_user: dict = Depends(get_current_user)):
    await MensajeController.postMensaje(websocket, IDConversacion, current_user)
