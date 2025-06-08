
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import Response
from .Usuario import UsuarioController
from fastapi.responses import JSONResponse
from models.Producto import Producto as ProductoModel
class ProductoFavoritoController:
    
    def getProductoFavorito(current_user : dict , db ):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
        else: 
            resul = db.execute(ProductoModel.select().where((ProductoFavoritoModel.c.IDUsuario == current_user["id"]) & (ProductoFavoritoModel.c.IDProducto == ProductoModel.c.IDProducto))).fetchall()
            lista = [dict(row._mapping) for row in resul]
            return lista
  
   
    
    def postProductoFavorito(productoFavorito , current_user : dict , db):
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {} :
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
        else:
        
            new_productoFavorito = {
                "IDUsuario": current_user["id"],
                "IDProducto": productoFavorito.IDProducto,
            }
            try:
                db.execute(ProductoFavoritoModel.insert().values(new_productoFavorito))
                db.commit()
                return JSONResponse(status_code=HTTP_200_OK , content={"message": "Producto Favorito creado correctamente"})
            except Exception as e:
                print(e)
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al crear el Producto Favorito"})
    
    def deleteProductoFavorito(productoFavorito , current_user : dict , db): 
        if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
        else:
            
                try:
                    db.execute(ProductoFavoritoModel.delete().where(
                        ProductoFavoritoModel.c.IDUsuario == current_user["id"],
                        ProductoFavoritoModel.c.IDProducto == productoFavorito.IDProducto
                    ))
                    db.commit()
                    return JSONResponse(status_code=HTTP_200_OK , content={"message": "Producto Favorito eliminado correctamente"})
                except Exception as e:
                    print(e)
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar el Producto Favorito"}) 