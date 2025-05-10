from fastapi import APIRouter
from config.db import conexion
from models.Producto import Producto as ProductoModel
from schemas.Producto import Producto as ProductoSchema
from controllers.Producto import ProductoController
from .auth import get_current_user
from fastapi import Depends, HTTPException, status
route = APIRouter()
namespace = "Producto"


@route.get("/")
def getProducto(current_user: dict = Depends(get_current_user)):
    return ProductoController.getProducto(current_user)

@route.get("/{IDProducto}")
def getIdProducto(IDProducto: int , current_user: dict = Depends(get_current_user)):
    return ProductoController.getIdProducto(IDProducto , current_user)

@route.post("/")
def postProducto(producto: ProductoSchema , current_user: dict = Depends(get_current_user)):
    return ProductoController.postProducto(producto , current_user)

@route.put("/{IDProducto}")
def putProducto(IDProducto: int, producto: ProductoSchema , current_user:dict = Depends(get_current_user)):
    return ProductoController.putProducto(IDProducto, producto , current_user)

@route.delete("/{IDProducto}")
def deleteProducto(IDProducto: int , current_user: dict = Depends(get_current_user)):
    return ProductoController.deleteProducto(IDProducto , current_user)

