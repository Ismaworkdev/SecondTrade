from fastapi import APIRouter
from config.db import conexion
from models.ImagenProducto import ImagenProducto as ImagenProductoModel
from schemas.ImagenProducto import ImagenProducto as ImagenProductoSchema
from controllers.ImagenProducto import ImagenProductoController 
from schemas.ImagenProducto import EditImage as EditImageSchema
route = APIRouter()
namespace = "ImagenProducto"

@route.get("/")
def getImagenes():
    return ImagenProductoController.getImagenes()

@route.get("/IDProducto/{IDImagen}")
def getImagesOfProducto(IDProducto: int):
    return ImagenProductoController.getImagesOfProducto(IDProducto)

@route.post("/")
def postImagen(imagen: ImagenProductoSchema):
    return ImagenProductoController.postImagen(imagen)

@route.put("/")
def putImagen(imagen: EditImageSchema):
    return ImagenProductoController.putImagen( imagen)

@route.delete("/{IDImagen}")
def deleteImagen(IDImagen: int):
    return ImagenProductoController.deleteImagen(IDImagen)