from fastapi import APIRouter
from config.db import conexion
from models.Producto import Producto as ProductoModel
from schemas.Producto import Producto as ProductoSchema
from controllers.Producto import ProductoController
route = APIRouter()
namespace = "Producto"


@route.get("/")
def getProducto():
    return ProductoController.getProducto()

@route.get("/{IDProducto}")
def getIdProducto(IDProducto: int):
    return ProductoController.getIdProducto(IDProducto)

@route.post("/")
def postProducto(producto: ProductoSchema):
    return ProductoController.postProducto(producto)

@route.put("/{IDProducto}")
def putProducto(IDProducto: int, producto: ProductoSchema):
    return ProductoController.putProducto(IDProducto, producto)

@route.delete("/{IDProducto}")
def deleteProducto(IDProducto: int):
    return ProductoController.deleteProducto(IDProducto)

