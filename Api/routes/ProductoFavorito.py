from fastapi import APIRouter
from config.db import conexion
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
ProductoFavorito = APIRouter()

@ProductoFavorito.get("/ProductoFavorito")
def get_ProductoFavorito():
    return conexion.execute(ProductoFavoritoModel.select()).fetchall()
