from config.db import conexion
from models.Producto import Producto as ProductoModel
from fastapi.responses import  Response

class ProductoController:
    def getProducto():
        resul = conexion.execute(ProductoModel.select()).fetchall()
        lista = [dict(row._mapping) for row in resul]
        return lista
    
    def getIdProducto(IDProducto):
        resul = conexion.execute(ProductoModel.select().where(ProductoModel.c.IDProducto == IDProducto)).mappings().first()
        objeto = dict(resul) if resul else {}
        return objeto





