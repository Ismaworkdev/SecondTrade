from fastapi import WebSocket, WebSocketDisconnect
from config.db import conexion
from models.Mensaje import Mensaje as MensajeModel
from schemas.Mensaje import Mensaje as MensajeSchema
from datetime import date
from typing import Dict, List

# Diccionario global que almacena websockets por conversacion
active_connections: Dict[int, List[WebSocket]] = {}

class MensajeController:

    def getMensajes(IDConversacion: int):
        resul = conexion.execute(
            MensajeModel.select().where(MensajeModel.c.IDConversacion == IDConversacion)
        ).fetchall()
        lista = [dict(row._mapping) for row in resul]
        return lista

    @staticmethod
    async def postMensaje(websocket: WebSocket, IDConversacion: int, IDUsuario: int):
        await websocket.accept()

        # Agrega el websocket a la lista de conexiones activas de esta conversación
        if IDConversacion not in active_connections:
            active_connections[IDConversacion] = []
        active_connections[IDConversacion].append(websocket)

        try:
            while True:
                data = await websocket.receive_text()

                # Crea el schema para validación
                mensaje = MensajeSchema(
                    IDConversacion=IDConversacion,
                    IDUsuario=IDUsuario,
                    Mensaje=data,
                    FechayHora=date.today()
                )

                # Guarda en la base de datos
                conexion.execute(
                    MensajeModel.insert().values(
                        IDConversacion=mensaje.IDConversacion,
                        IDUsuario=mensaje.IDUsuario,
                        Mensaje=mensaje.Mensaje,
                        FechayHora=mensaje.FechayHora
                    )
                )
                conexion.commit()

                # Envía el mensaje a todos los conectados en la misma conversación
                for connection in active_connections[IDConversacion]:
                    await connection.send_text(f"Usuario {IDUsuario}: {mensaje.Mensaje}")

        except WebSocketDisconnect:
            print(f"Usuario {IDUsuario} se desconectó de la conversación {IDConversacion}")
            # Remueve la conexión
            active_connections[IDConversacion].remove(websocket)
            if not active_connections[IDConversacion]:
                del active_connections[IDConversacion]
