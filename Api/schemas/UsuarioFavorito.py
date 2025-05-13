from typing import Optional
from pydantic import BaseModel
from datetime import date

class UsuarioFavorito(BaseModel):
    IDUsuarioGustado: Optional[int]
    
    Fecha_agregado: date

    class Config:
        orm_mode = True