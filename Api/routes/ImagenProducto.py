from fastapi import APIRouter
from config.db import conexion
from models.ImagenProducto import ImagenProducto as ImagenProductoModel
ImagenProducto = APIRouter()

@ImagenProducto.get("/ImagenProducto")
def getImagenProducto():
    return conexion.execute(ImagenProductoModel.select()).fetchall()
