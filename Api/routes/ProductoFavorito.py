from fastapi import APIRouter
from config.db import conexion
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
ProductoFavorito = APIRouter()

@ProductoFavorito.get("/ProductoFavorito")
def getProductoFavorito():
    return conexion.execute(ProductoFavoritoModel.select()).fetchall()
