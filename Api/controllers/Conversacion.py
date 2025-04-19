from fastapi import APIRouter, HTTPException
from config.db import conexion
from models.Conversacion import Conversacion as ConversacionModel
from schemas.Conversacion import Conversacion as ConversacionSchema
from models.Producto import Producto as ProductoModel

class ConversacionController:
    
    def postConversacion(id_comprador, id_producto):
        # Obtener el vendedor asociado al producto
        UsuarioVendedor = conexion.execute(
            ProductoModel.select().where(ProductoModel.c.IDProducto == id_producto)
        ).first()
        
        if not UsuarioVendedor:
            raise HTTPException(status_code=404, detail="Vendedor no encontrado para el producto.")
        
        id_vendedor = UsuarioVendedor.IDUsuario  # Suponiendo que IDUsuario es el campo correcto
        
        # Verificar existencia de la conversación
        Existencia = conexion.execute(
            ConversacionModel.select().where(
                (ConversacionModel.c.IDUsuarioComprador == id_comprador) &
                (ConversacionModel.c.IDUsuarioVendedor == id_vendedor) &
                (ConversacionModel.c.IDProducto == id_producto)
            )
        ).first()

        if not Existencia:
            # Crear nueva conversación
            conexion.execute(
                ConversacionModel.insert().values(
                    IDUsuarioComprador=id_comprador,
                    IDUsuarioVendedor=id_vendedor,
                    IDProducto=id_producto
                )
            )
            conexion.commit()
            return {"status": 201, "detail": "Created"}
        
        return {"status": 200, "detail": "La conversación ya existe", "IDConversacion": Existencia.IDConversacion}
