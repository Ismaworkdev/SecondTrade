from fastapi import APIRouter , Response , Depends
from config.db import conexion
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
from schemas.ProductoFavorito import ProductoFavorito as ProductoFavoritoSchema
from controllers.ProductoFavorito import ProductoFavoritoController
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "ProductoFavorito"


@route.get("/")
def getProductoFavorito(current_user: dict = Depends(get_current_user)):
    return ProductoFavoritoController.getProductoFavorito(current_user)

@route.post("/")
def postProductoFavorito(  productoFavorito: ProductoFavoritoSchema, current_user: dict = Depends(get_current_user) ):
    return ProductoFavoritoController.postProductoFavorito(  productoFavorito , current_user)

@route.delete("/")
def deleteProductoFavorito(productoFavorito: ProductoFavoritoSchema , current_user: dict = Depends(get_current_user)):
    return ProductoFavoritoController.deleteProductoFavorito(productoFavorito , current_user)



