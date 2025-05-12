from fastapi import APIRouter , Response , Depends
from config.db import conexion
from models.ImagenProducto import ImagenProducto as ImagenProductoModel
from schemas.ImagenProducto import ImagenProducto as ImagenProductoSchema
from controllers.ImagenProducto import ImagenProductoController 
from schemas.ImagenProducto import EditImage as EditImageSchema , DeleteImage as DeleteImageSchema
from .auth import get_current_user
route = APIRouter()
namespace = "ImagenProducto"

@route.get("/")
def getImagenes():
    return ImagenProductoController.getImagenes()

@route.get("/IDProducto/{IDProducto}")
def getImagesOfProducto(IDProducto: int):
    return ImagenProductoController.getImagesOfProducto(IDProducto)

@route.post("/")
def postImagen(imagen: ImagenProductoSchema , current_user: dict = Depends(get_current_user)):
    return ImagenProductoController.postImagen(imagen , current_user)

@route.put("/")
def putImagen(imagen: EditImageSchema , current_user: dict = Depends(get_current_user)):
    return ImagenProductoController.putImagen( imagen , current_user)

@route.delete("/")
def deleteImagen(Image: DeleteImageSchema , current_user: dict = Depends(get_current_user)):
    return ImagenProductoController.deleteImagen(Image , current_user)