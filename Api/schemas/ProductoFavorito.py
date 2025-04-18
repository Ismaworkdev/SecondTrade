from typing import Optional
from pydantic import BaseModel
from datetime import date

class ProductoFavorito(BaseModel):
    IDUsuario: int
    IDProducto: int
   

    class Config:
        orm_mode = True