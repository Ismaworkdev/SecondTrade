from typing import Optional
from pydantic import BaseModel
from datetime import date

class Mensaje(BaseModel):   
    IDMensaje: Optional[int] = None
    FechayHora: date
    IDUsuario: int  # Remitente
    IDConversacion: int
    Mensaje: str

    class Config:
        orm_mode = True