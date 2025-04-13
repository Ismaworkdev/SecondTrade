from typing import Optional
from pydantic import BaseModel
from datetime import date
from pydantic.networks import EmailStr

class Usuario(BaseModel):
    IDUsuario: Optional[int]
    Nombre: str
    Apellido: str
    Correo: EmailStr
    Contrasena: str
    Telefono: str
    Fecha_nacimiento: date
    Ciudad: str
    Direccion: str
    Imagen_perfil: Optional[bytes] = None

