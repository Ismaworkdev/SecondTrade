from typing import Optional
from pydantic import BaseModel
from datetime import date

class Producto(BaseModel):
    IDProducto: Optional[int]
    IDUsuario: int
    Nombre: str
    Descripcion: str
    Precio: float
    Fecha_publicacion: date
    Imagen_producto: Optional[bytes] = None
    Categoria: str
    Ciudad: str

    class Config:
        orm_mode = True