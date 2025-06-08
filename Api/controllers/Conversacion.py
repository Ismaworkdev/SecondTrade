from fastapi import APIRouter, HTTPException
from models.Mensaje import Mensaje as MensajeModel
from starlette.status import HTTP_201_CREATED, HTTP_200_OK , HTTP_400_BAD_REQUEST
from fastapi.responses import JSONResponse
from models.Conversacion import Conversacion as ConversacionModel
from models.Usuario import Usuario as UsuarioModel
from schemas.Conversacion import Conversacion as ConversacionSchema
from models.Producto import Producto as ProductoModel
from .Usuario import UsuarioController
import requests
class ConversacionController:
    
    def getConversaciones(current_user: dict, db):
            try:
                if UsuarioController.getGmailUser(current_user["Gmail"], db) == {}:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Usuario no encontrado"})

                conver = db.execute(
                    ConversacionModel.select().where(
                        (ConversacionModel.c.IDUsuarioComprador == current_user["id"]) |
                        (ConversacionModel.c.IDUsuarioVendedor == current_user["id"])
                    )
                ).fetchall()

                resul = [dict(row._mapping) for row in conver]
                return  resul

            except Exception as e:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": f"Error: {str(e)}"})

    def getConversacion(id, current_user: dict, db):
            try:
                if UsuarioController.getGmailUser(current_user["Gmail"], db) == {}:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Usuario no encontrado"})

                conver = db.execute(
                    ConversacionModel.select().where(
                        ConversacionModel.c.IDConversacion == id
                    )
                ).mappings().first()

                if conver:
                    return dict(conver)
                else:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Conversación no encontrada"})

            except Exception as e:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": f"Error: {str(e)}"})

    def getexist(idCon, current_user: dict, db):
            try:
                if UsuarioController.getGmailUser(current_user["Gmail"], db) == {}:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Usuario no encontrado"})

                conver = db.execute(
                    ConversacionModel.select().where(
                        ConversacionModel.c.IDConversacion == idCon
                    )
                ).mappings().first()

                exists = conver is not None
                return  exists

            except Exception as e:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": f"Error: {str(e)}"})

    def getMaxid(current_user: dict, db):
            try:
                if UsuarioController.getGmailUser(current_user["Gmail"], db) == {}:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Usuario no encontrado"})

                query = ConversacionModel.select().with_only_columns(
                    ConversacionModel.c.IDConversacion
                ).order_by(
                    ConversacionModel.c.IDConversacion.desc()
                ).limit(1)

                result = db.execute(query).fetchone()

                if result:
                    return  result[0]
                else:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "No hay conversaciones"})

            except Exception as e:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": f"Error: {str(e)}"})
            
    
    def postConversacion( id_producto  , current_user : dict , db ):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Usuario no encontrado"})
        else:
            # Obtener el vendedor asociado al producto
            UsuarioVendedor = db.execute(
                ProductoModel.select().where(ProductoModel.c.IDProducto == id_producto)
            ).first()
            
            if not UsuarioVendedor:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Vendedor no encontrado para el producto."})
                
            
            id_vendedor = UsuarioVendedor.IDUsuario
            stmt = UsuarioModel.select().where(UsuarioModel.c.IDUsuario == id_vendedor)
            resul = db.execute(stmt).mappings().first()  
            
            # Verificar existencia de la conversación
            Existencia = db.execute(
                ConversacionModel.select().where(
                    (ConversacionModel.c.IDUsuarioComprador == current_user["id"]) &
                    (ConversacionModel.c.IDUsuarioVendedor == id_vendedor) &
                    (ConversacionModel.c.IDProducto == id_producto)
                )
            ).first()

            if not Existencia:
                # Crear nueva conversación
                db.execute(
                    ConversacionModel.insert().values(
                        IDUsuarioComprador=current_user["id"],
                        IDUsuarioVendedor=id_vendedor,
                        IDProducto=id_producto
                    )
                )
                db.commit()
                email = {
                        "email": resul.Gmail,
                        "subject": "Conversaciones Pendientes",
                        "message":  f" {resul.Nombre} , tienes conversaciones pendientes .  Revisa tu bandeja de Entrada "     
                    }
                response = requests.post("http://127.0.0.1:8000/email/", 
                                             json=email, 
                                             headers = {
                                              "accept": "application/json",
                                              "Content-Type": "application/json"
                                            })
                print("Código de estado:", response.status_code)
                print("Respuesta del servidor:", response.text)
                return JSONResponse(status_code=HTTP_200_OK , content={"message": "Conversación creada correctamente"})
            
            return  JSONResponse(status_code=HTTP_200_OK , content={"message": "Conversación ya existe "})
 
    def deleteConversacion(IDConversacion , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Usuario no encontrado"})
        else:
            # Verificar existencia de la conversación
            Existencia = db.execute(
                ConversacionModel.select().where(
                    (ConversacionModel.c.IDConversacion == IDConversacion) &
                   ( (ConversacionModel.c.IDUsuarioComprador == current_user["id"])  |
                    (ConversacionModel.c.IDUsuarioVendedor == current_user["id"]) 
                    )
                )
            ).first()

            if not Existencia:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Conversación no encontrada"})
            
            # Eliminar conversación
            db.execute(
                MensajeModel.delete().where(MensajeModel.c.IDConversacion == IDConversacion)
            )
            db.execute(
                ConversacionModel.delete().where(ConversacionModel.c.IDConversacion == IDConversacion)
            )
            db.commit()
            return JSONResponse(status_code=HTTP_200_OK , content={"message": "Conversación eliminada correctamente"})