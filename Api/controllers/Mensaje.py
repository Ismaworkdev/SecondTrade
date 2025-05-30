from fastapi import WebSocket, WebSocketDisconnect

from models.Mensaje import Mensaje as MensajeModel
from schemas.Mensaje import Mensaje as MensajeSchema
from datetime import date
from typing import Dict, List
from fastapi.responses import JSONResponse
from .Usuario import UsuarioController

active_connections: Dict[int, List[WebSocket]] = {}

class MensajeController:

    def getMensajes(IDConversacion: int , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 , content={"message": "Usuario no encontrado"})
        else:
            resul = db.execute(
                MensajeModel.select().where(MensajeModel.c.IDConversacion == IDConversacion)
            ).fetchall()
            lista = [dict(row._mapping) for row in resul]
            return lista

    @staticmethod
    async def postMensaje(websocket: WebSocket, IDConversacion: int, current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 , content={"message": "Usuario no encontrado"})
        else:
                    await websocket.accept()

                
                    if IDConversacion not in active_connections:
                        active_connections[IDConversacion] = []
                    active_connections[IDConversacion].append(websocket)

                    try:
                        while True:
                            data = await websocket.receive_text()
                            mensaje = MensajeSchema(
                                IDConversacion=IDConversacion,
                                IDUsuario=current_user["id"],
                                Mensaje=data,
                                FechayHora=date.today()
                            )

                        
                            db.execute(
                                MensajeModel.insert().values(
                                    IDConversacion=mensaje.IDConversacion,
                                    IDUsuario=mensaje.IDUsuario,
                                    Mensaje=mensaje.Mensaje,
                                    FechayHora=mensaje.FechayHora
                                )
                            )
                            db.commit()

                        
                            for connection in active_connections[IDConversacion]:
                                await connection.send_text(f"Usuario {current_user["id"]}: {mensaje.Mensaje}")

                    except WebSocketDisconnect:
                        print(f"Usuario {current_user["id"]} se desconectó de la conversación {IDConversacion}")
                    
                        active_connections[IDConversacion].remove(websocket)
                        if not active_connections[IDConversacion]:
                            del active_connections[IDConversacion]
