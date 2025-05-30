from fastapi import APIRouter , Response , Depends
from sqlalchemy.orm import Session
from models.ImagenProducto import ImagenProducto as ImagenProductoModel
from schemas.ImagenProducto import ImagenProducto as ImagenProductoSchema
from controllers.ImagenProducto import ImagenProductoController 
from config.db import get_db
from schemas.ImagenProducto import EditImage as EditImageSchema , DeleteImage as DeleteImageSchema
from .auth import get_current_user
route = APIRouter()
namespace = "ImagenProducto"

@route.get("/")
def getImagenes():
    return ImagenProductoController.getImagenes()

@route.get("/IDProducto/{IDProducto}")
def getImagesOfProducto(IDProducto: int ,db: Session = Depends(get_db) ):
    return ImagenProductoController.getImagesOfProducto(IDProducto , db)

@route.post("/")
def postImagen(imagen: ImagenProductoSchema , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)) :
    return ImagenProductoController.postImagen(imagen , current_user , db)



@route.delete("/")
def deleteImagen(IDProducto: int, current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ImagenProductoController.deleteImagen(IDProducto , current_user , db)