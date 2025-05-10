
from config.db import conexion
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import Response

class ProductoFavoritoController:
    
    def getProductoFavorito(IDUsuario: int):
      resul = conexion.execute(ProductoFavoritoModel.select().where(ProductoFavoritoModel.c.IDUsuario == IDUsuario)).fetchall()
      lista = [dict(row._mapping) for row in resul]
      return lista
  
   
    
    def postProductoFavorito(productoFavorito):
        new_productoFavorito = {
            "IDUsuario": productoFavorito.IDUsuario,
            "IDProducto": productoFavorito.IDProducto,
        }
        try:
            conexion.execute(ProductoFavoritoModel.insert().values(new_productoFavorito))
            conexion.commit()
            return Response(status_code=HTTP_200_OK , content={"message": "Producto Favorito creado correctamente"})
        except Exception as e:
            print(e)
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al crear el Producto Favorito"})
    
    def deleteProductoFavorito(productoFavorito):
        try:
            conexion.execute(ProductoFavoritoModel.delete().where(
                ProductoFavoritoModel.c.IDUsuario == productoFavorito.IDUsuario,
                ProductoFavoritoModel.c.IDProducto == productoFavorito.IDProducto
            ))
            conexion.commit()
            return Response(status_code=HTTP_200_OK , content={"message": "Producto Favorito eliminado correctamente"})
        except Exception as e:
            print(e)
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar el Producto Favorito"}) 