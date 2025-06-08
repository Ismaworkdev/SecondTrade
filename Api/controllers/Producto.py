
from models.Producto import Producto as ProductoModel
from fastapi.responses import JSONResponse 
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK

from controllers.Usuario import UsuarioController
from controllers.Usuario import UsuarioController
from models.ImagenProducto import ImagenProducto as ImageProductoModel
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
from models.Conversacion import Conversacion as ConversacionModel
import re
from sqlalchemy import or_, and_, func
class ProductoController:
    def getMaxProducto(current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 ,content="El correo no existe")
        else:
            query = ProductoModel.select().with_only_columns(ProductoModel.c.IDProducto).order_by(ProductoModel.c.IDProducto.desc()).limit(1)
            result = db.execute(query).fetchone()
            return result[0]

        
    def getProductos(current_user: dict , db):
        if current_user["id"] != 1 :  
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "No autorizado"})
        else:    
         resul = db.execute(ProductoModel.select()).fetchall()
         lista = [dict(row._mapping) for row in resul]
         return lista
        
    def getProductoUser( id ,current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 ,content="El correo no existe")
        else:
         ide = id if id != -1 else current_user["id"]

         resul = db.execute(ProductoModel.select().where(ProductoModel.c.IDUsuario == ide )).fetchall()
         lista = [dict(row._mapping) for row in resul]
         return lista


    def SearchProductoUser(string, Categoria, current_user: dict, db):
        # Validar usuario
        if UsuarioController.getGmailUser(current_user["Gmail"], db) == {}:
            return JSONResponse(status_code=400, content="El correo no existe")
        
        # Consulta base
        query = ProductoModel.select()

        # Filtrar por categoría si no es "Todos"
        if Categoria != "Todos":
            query = query.where(func.lower(ProductoModel.c.Categoria) == Categoria.lower())

        # Si string es None o vacío, devolver sin aplicar filtros de búsqueda
        if  string == "all":
            resul = db.execute(query).fetchall()
            return [dict(row._mapping) for row in resul]
        else :

            # Eliminar puntuación y preposiciones
            preposiciones = ["a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante",
                            "en", "entre", "hacia", "hasta", "mediante", "para", "por", "según",
                            "sin", "so", "sobre", "tras"]

            string_limpio = re.sub(r'[^\w\s]', '', string.lower())
            palabras = string_limpio.split()
            palabras_filtradas = [p for p in palabras if p not in preposiciones]

            # Condiciones de búsqueda
            condiciones = []
            for palabra in palabras_filtradas:
                condiciones.append(or_(
                    func.lower(ProductoModel.c.Titulo).ilike(f"% {palabra} %"),
                    func.lower(ProductoModel.c.Titulo).ilike(f"{palabra} %"),
                    func.lower(ProductoModel.c.Titulo).ilike(f"% {palabra}"),
                    func.lower(ProductoModel.c.Titulo).ilike(f"{palabra}"),
                    func.lower(ProductoModel.c.Descripcion).ilike(f"% {palabra} %"),
                    func.lower(ProductoModel.c.Descripcion).ilike(f"{palabra} %"),
                    func.lower(ProductoModel.c.Descripcion).ilike(f"% {palabra}"),
                    func.lower(ProductoModel.c.Descripcion).ilike(f"{palabra}"),
                ))

            if condiciones:
                query = query.where(and_(*condiciones))

            resul = db.execute(query).fetchall()
            print(resul) 
            return [dict(row._mapping) for row in resul]

        
    def getIdProducto(IDProducto , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 ,content="El correo no existe")
        else:
            resul = db.execute(ProductoModel.select().where(ProductoModel.c.IDProducto == IDProducto)).mappings().first()
            objeto = dict(resul) if resul else {}
            return objeto
    
    def postProducto(producto , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 ,content="El Usuario no existe")
        new_producto = {
            
            "Precio": producto.Precio,
            "Titulo": producto.Titulo,
            "Descripcion": producto.Descripcion,
            "Estado": producto.Estado,
            "Fecha_hora_subida": producto.Fecha_hora_subida,
            "Categoria": producto.Categoria,
            "IDUsuario": current_user["id"]
        }

            
        try:
            if UsuarioController.getIDUsuario(current_user["id"] , db) == {}:
              return JSONResponse(status_code=400 ,content="El IDUsuario no existe")
            else:
            
            
             result = db.execute(ProductoModel.insert().values(new_producto))
             db.commit()
             
             # Obtener el ID insertado
             new_id = result.inserted_primary_key[0]
             
             return JSONResponse(status_code=201 , content={"new_id": new_id})
        except Exception as e:
            print(e)
            return JSONResponse(status_code=400 ,content={"ok" : False})
        
        
    
    def putProducto(IDProducto, producto , current_user: dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 ,content="El Usuario no existe")
        new_producto = {
            "IDProducto": IDProducto,
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
             
              return JSONResponse(status_code=400 ,content="El IDUsuario no existe")
            else:
             db.execute(ProductoModel.update().values(new_producto).where(ProductoModel.c.IDProducto == IDProducto))
             db.commit()
             return JSONResponse(status_code=200 ,content={"ok" : True} )
        except Exception as e:
            print(e)
            return JSONResponse(status_code=400 ,content={"ok " : False})
        
    
    def deleteProducto(IDProducto , current_user,db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=400 ,content="El Usuario no existe")
        else :
            try:
                
                db.execute(ProductoFavoritoModel.delete().where(ProductoFavoritoModel.c.IDProducto == IDProducto))
                
                db.execute(ImageProductoModel.delete().where(ImageProductoModel.c.IDProducto == IDProducto))
                
                db.execute(ConversacionModel.delete().where(ConversacionModel.c.IDProducto == IDProducto))
               
                db.execute(ProductoModel.delete().where(ProductoModel.c.IDProducto == IDProducto))
                db.commit()
                return JSONResponse(status_code=200,content={"ok" : True})
            except Exception as e:
                print(e)
                return JSONResponse(status_code=400 ,content={"ok" : False})

    def deleteProductoadmin(IDProducto , current_user,db):
        if current_user["id"] != 1:
            return JSONResponse(status_code=400 ,content="No autorizado")
        else :
            try:
                
                db.execute(ProductoFavoritoModel.delete().where(ProductoFavoritoModel.c.IDProducto == IDProducto))
                
                db.execute(ImageProductoModel.delete().where(ImageProductoModel.c.IDProducto == IDProducto))
                
                db.execute(ConversacionModel.delete().where(ConversacionModel.c.IDProducto == IDProducto))
               
                db.execute(ProductoModel.delete().where(ProductoModel.c.IDProducto == IDProducto))
                db.commit()
                return JSONResponse(status_code=200,content={"ok" : True})
            except Exception as e:
                print(e)
                return JSONResponse(status_code=400 ,content={"ok" : False})            


