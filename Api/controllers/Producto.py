
from models.Producto import Producto as ProductoModel
from fastapi.responses import  Response
from controllers.Usuario import UsuarioController
from controllers.Usuario import UsuarioController
class ProductoController:
    def getProducto(current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return Response(status_code=400 ,content="El correo no existe")
        else:
         resul = db.execute(ProductoModel.select()).fetchall()
         lista = [dict(row._mapping) for row in resul]
         return lista
    
    def getIdProducto(IDProducto , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return Response(status_code=400 ,content="El correo no existe")
        else:
         resul = db.execute(ProductoModel.select().where(ProductoModel.c.IDProducto == IDProducto)).mappings().first()
         objeto = dict(resul) if resul else {}
         return objeto
    
    def postProducto(producto , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return Response(status_code=400 ,content="El Usuario no existe")
        new_producto = {
            "IDProducto": producto.IDProducto,
            "Precio": producto.Precio,
            "Titulo": producto.Titulo,
            "Descripcion": producto.Descripcion,
            "Estado": producto.Estado,
            "Fecha_hora_subida": producto.Fecha_hora_subida,
            "Categoria": producto.Categoria,
            "IDUsuario": current_user["id"]
        }

            
        try:
            if UsuarioController.getIDUsuario(producto.IDUsuario , db) == {}:
              return Response(status_code=400 ,content="El IDUsuario no existe")
            else:
             db.execute(ProductoModel.insert().values(new_producto))
             db.commit()
             return Response(status_code=201)
        except Exception as e:
            print(e)
            return Response(status_code=400)
        
        
    
    def putProducto(IDProducto, producto , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return Response(status_code=400 ,content="El Usuario no existe")
        new_producto = {
            "IDProducto": producto.IDProducto,
            "Precio": producto.Precio,
            "Titulo": producto.Titulo,
            "Descripcion": producto.Descripcion,
            "Estado": producto.Estado,
            "Fecha_hora_subida": producto.Fecha_hora_subida,
            "Categoria": producto.Categoria,
            "IDUsuario": current_user["id"]
        }
        try:
            if UsuarioController.getIDUsuario(producto.IDUsuario , db) == {}:
             
              return Response(status_code=400 ,content="El IDUsuario no existe")
            else:
             db.execute(ProductoModel.update().values(new_producto).where(ProductoModel.c.IDProducto == IDProducto))
             db.commit()
             return Response(status_code=200)
        except Exception as e:
            print(e)
            return Response(status_code=400)
        
    
    def deleteProducto(IDProducto , db):
        try:
            db.execute(ProductoModel.delete().where(ProductoModel.c.IDProducto == IDProducto))
            db.commit()
            return Response(status_code=200)
        except Exception as e:
            print(e)
            return Response(status_code=400)


