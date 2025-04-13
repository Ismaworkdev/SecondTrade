from fastapi import APIRouter
from config.db import conexion
from models.Producto import Producto as ProductoModel
Producto = APIRouter()

@Producto.get("/Producto")
def getProducto():
    return conexion.execute(ProductoModel.select()).fetchall()
