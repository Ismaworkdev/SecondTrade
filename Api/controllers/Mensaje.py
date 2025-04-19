
from fastapi import APIRouter , WebSocket 
from config.db import conexion
from models.Mensaje import Mensaje as MensajeModel
from schemas.Mensaje import Mensaje as MensajeSchema



class MensajeController:
    
    def getMensajes(IDConversacion: int):
        resul = conexion.execute(MensajeModel.select().where(MensajeModel.c.IDConversacion == IDConversacion)).fetchall()
        lista = [dict(row._mapping) for row in resul]
        return lista
    
    async def postMensaje(IDConversacion: int, IDUsuario: int):
        async with WebSocket:
            await WebSocket.accept()
            while True:
                data = await WebSocket.receive_text()
                mensaje = MensajeSchema(IDConversacion=IDConversacion, IDUsuario=IDUsuario, Mensaje=data)
                new_mensaje = {
                    "IDConversacion": mensaje.IDConversacion,
                    "IDUsuario": mensaje.IDUsuario,
                    "Mensaje": mensaje.Mensaje
                }
                conexion.execute(MensajeModel.insert().values(new_mensaje))
                conexion.commit()
               