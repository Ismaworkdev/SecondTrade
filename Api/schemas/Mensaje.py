from typing import Optional
from pydantic import BaseModel
from datetime import date

class Mensaje(BaseModel):   
    IDMensaje: Optional[int]
    FechayHora: date
    IDUsuario: int
    IDProducto: int
    Mensaje: str

    class Config:
        orm_mode = True