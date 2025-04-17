from typing import Optional
from pydantic import BaseModel
from datetime import date

class Conversacion(BaseModel):      
    IDConversacion: Optional[int]
    IDProducto: int
    IDUsuario: int
    Fecha_inicio: date

    class Config:
        orm_mode = True