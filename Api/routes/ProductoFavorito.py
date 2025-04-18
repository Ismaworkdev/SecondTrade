from fastapi import APIRouter
from config.db import conexion
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
from schemas.ProductoFavorito import ProductoFavorito as ProductoFavoritoSchema
from controllers.ProductoFavorito import ProductoFavoritoController
route = APIRouter()
namespace = "ProductoFavorito"


@route.get("/{IDUsuario}")
def getProductoFavorito(IDUsuario: int):
    return ProductoFavoritoController.getProductoFavorito(IDUsuario)

@route.post("/")
def postProductoFavorito(productoFavorito: ProductoFavoritoSchema):
    return ProductoFavoritoController.postProductoFavorito(productoFavorito)

@route.delete("/")
def deleteProductoFavorito(productoFavorito: ProductoFavoritoSchema):
    return ProductoFavoritoController.deleteProductoFavorito(productoFavorito)



