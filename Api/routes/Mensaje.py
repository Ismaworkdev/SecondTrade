
from fastapi import APIRouter , WebSocket
from config.db import conexion
from models.Mensaje import Mensaje as MensajeModel
from schemas.Mensaje import Mensaje as MensajeSchema
from controllers.Mensaje import MensajeController
route = APIRouter()
namespace = "Mensaje"

@route.get("/{IDConversacion}")
def getMensajes(IDConversacion: int):
        return MensajeController.getMensajes(IDConversacion)
    
@route.websocket("/ws/{IDConversacion}/{IDUsuario}")
async def postMensaje(websocket: WebSocket, IDConversacion: int, IDUsuario: int):
      return MensajeController.postMensaje(IDConversacion, IDUsuario)      
    
      


