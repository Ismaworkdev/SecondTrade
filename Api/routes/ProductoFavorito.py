from fastapi import APIRouter , Response , Depends
from sqlalchemy.orm import Session
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
from schemas.ProductoFavorito import ProductoFavorito as ProductoFavoritoSchema
from controllers.ProductoFavorito import ProductoFavoritoController
from .auth import postUser as auth_postUser , get_current_user
from config.db import get_db
route = APIRouter()
namespace = "ProductoFavorito"


@route.get("/")
def getProductoFavorito(current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ProductoFavoritoController.getProductoFavorito(current_user , db)

@route.post("/")
def postProductoFavorito(  productoFavorito: ProductoFavoritoSchema, current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ProductoFavoritoController.postProductoFavorito(  productoFavorito , current_user , db)

@route.delete("/")
def deleteProductoFavorito(productoFavorito: ProductoFavoritoSchema , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ProductoFavoritoController.deleteProductoFavorito(productoFavorito , current_user , db)  



