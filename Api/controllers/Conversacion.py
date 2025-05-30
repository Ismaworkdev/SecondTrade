from fastapi import APIRouter, HTTPException

from starlette.status import HTTP_201_CREATED, HTTP_200_OK , HTTP_400_BAD_REQUEST
from fastapi.responses import JSONResponse
from models.Conversacion import Conversacion as ConversacionModel
from schemas.Conversacion import Conversacion as ConversacionSchema
from models.Producto import Producto as ProductoModel
from .Usuario import UsuarioController
class ConversacionController:
    
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
                    (ConversacionModel.c.IDUsuarioComprador == current_user["id"])
                )
            ).first()

            if not Existencia:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Conversación no encontrada"})
            
            # Eliminar conversación
            db.execute(
                ConversacionModel.delete().where(ConversacionModel.c.IDConversacion == IDConversacion)
            )
            db.commit()
            return JSONResponse(status_code=HTTP_200_OK , content={"message": "Conversación eliminada correctamente"})