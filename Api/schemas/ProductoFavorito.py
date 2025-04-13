from typing import Optional
from pydantic import BaseModel
from datetime import date

class ProductoFavorito(BaseModel):
    IDProductoFavorito: Optional[int]
    IDUsuario: int
    IDProducto: int
    Fecha_agregado: date

    class Config:
        orm_mode = True