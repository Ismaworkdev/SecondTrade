
from config.db import conexion
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel


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
            return {"message": "Producto Favorito agregado correctamente"}
        except Exception as e:
            print(e)
            return {"message": "Error al agregar Producto Favorito"}
    
    def deleteProductoFavorito(productoFavorito):
        try:
            conexion.execute(ProductoFavoritoModel.delete().where(
                ProductoFavoritoModel.c.IDUsuario == productoFavorito.IDUsuario,
                ProductoFavoritoModel.c.IDProducto == productoFavorito.IDProducto
            ))
            conexion.commit()
            return {"message": "Producto Favorito eliminado correctamente"}
        except Exception as e:
            print(e)
            return {"message": "Error al eliminar Producto Favorito"}    