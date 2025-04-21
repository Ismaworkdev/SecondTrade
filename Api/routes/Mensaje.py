from fastapi import APIRouter, WebSocket
from controllers.Mensaje import MensajeController

route = APIRouter()
namespace = "Mensaje"

@route.get("/{IDConversacion}")
def getMensajes(IDConversacion: int):
    return MensajeController.getMensajes(IDConversacion)

@route.websocket("/ws/{IDConversacion}/{IDUsuario}")
async def postMensaje(websocket: WebSocket, IDConversacion: int, IDUsuario: int):
    await MensajeController.postMensaje(websocket, IDConversacion, IDUsuario)
