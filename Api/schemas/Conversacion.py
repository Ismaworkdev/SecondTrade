from typing import Optional
from pydantic import BaseModel
from datetime import date

class Conversacion(BaseModel):      
    IDConversacion: Optional[int]
    IDUsuario1: int
    IDUsuario2: int
    Fecha_creacion: date

    class Config:
        orm_mode = True