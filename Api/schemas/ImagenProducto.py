from typing import Optional
from pydantic import BaseModel
from datetime import date

class ImagenProducto(BaseModel):
    IDImagenProducto: Optional[int]
    IDProducto: int
    Imagen: bytes
    Fecha_subida: date

    class Config:
        orm_mode = True