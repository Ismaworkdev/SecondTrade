from typing import Optional
from pydantic import BaseModel
from datetime import date
from pydantic.networks import EmailStr

class Usuario(BaseModel):
    IDUsuario: Optional[int] = None
    Nombre: str
    Apellidos: str
    Gmail: EmailStr
    Contrasena: str
    Telefono: str
    Calle : str
    Ciudad_Pueblo : str
    Provincia: str
    Region: str
    Codigo_postal: str
    Fecha_nacimiento: date

    ImgPerfil: Optional[bytes] = None


    class Config:
        orm_mode = True 