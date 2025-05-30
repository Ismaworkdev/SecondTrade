from fastapi import APIRouter

from models.Producto import Producto as ProductoModel
from schemas.Producto import Producto as ProductoSchema
from controllers.Producto import ProductoController
from .auth import get_current_user
from config.db import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
route = APIRouter()
namespace = "Producto"


@route.get("/")
def getProducto(current_user: dict = Depends(get_current_user) ,db: Session = Depends(get_db) ):
    return ProductoController.getProducto(current_user , db)

@route.get("/{IDProducto}")
def getIdProducto(IDProducto: int , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ProductoController.getIdProducto(IDProducto , current_user , db)

@route.post("/")
def postProducto(producto: ProductoSchema , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ProductoController.postProducto(producto , current_user , db)

@route.put("/{IDProducto}")
def putProducto(IDProducto: int, producto: ProductoSchema , current_user:dict = Depends(get_current_user) , db: Session = Depends(get_db) ):
    return ProductoController.putProducto(IDProducto, producto , current_user , db)

@route.delete("/{IDProducto}")
def deleteProducto(IDProducto: int , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return ProductoController.deleteProducto(IDProducto , current_user , db)

