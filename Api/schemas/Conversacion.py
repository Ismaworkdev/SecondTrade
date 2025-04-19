from pydantic import BaseModel
from typing import Optional

class Conversacion(BaseModel):
    IDConversacion: Optional[int]
    IDUsuarioComprador: int
    IDUsuarioVendedor: int
    IDProducto: int

    class Config:
        orm_mode = True
