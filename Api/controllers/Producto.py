from config.db import conexion
from models.Producto import Producto as ProductoModel
from fastapi.responses import  Response
from controllers.Usuario import UsuarioController
class ProductoController:
    def getProducto():
        resul = conexion.execute(ProductoModel.select()).fetchall()
        lista = [dict(row._mapping) for row in resul]
        return lista
    
    def getIdProducto(IDProducto):
        resul = conexion.execute(ProductoModel.select().where(ProductoModel.c.IDProducto == IDProducto)).mappings().first()
        objeto = dict(resul) if resul else {}
        return objeto
    def postProducto(producto):
        new_producto = {
            "Precio": producto.Precio,
            "Titulo": producto.Titulo,
            "Descripcion": producto.Descripcion,
            "Estado": producto.Estado,
            "Fecha_hora_subida": producto.Fecha_hora_subida,
            "Categoria": producto.Categoria,
            "IdUsuario": producto.IdUsuario
        }

            
        try:
            if UsuarioController.getGmailUser(producto.IdUsuario) == {}:
              return Response(status_code=400)
            else:
             conexion.execute(ProductoModel.insert().values(new_producto))
             conexion.commit()
             return Response(status_code=201)
        except Exception as e:
            print(e)
            return Response(status_code=400)





