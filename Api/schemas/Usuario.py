from typing import Optional
from pydantic import BaseModel
from datetime import date
from pydantic.networks import EmailStr  
from pydantic import field_validator , Field

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
    @field_validator("Contrasena")
    @classmethod
    def validateContrasena(cls, contrasena: str) -> str:
        
  
        if len(contrasena) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres.")
        if not any(char.isdigit() for char in contrasena):
            raise ValueError("La contraseña debe contener al menos un número.")
        return contrasena




class CambiarContrasena(BaseModel):


    Contrasena_antigua: str = Field(min_length=8)

    Contrasena_Nueva: str = Field(min_length=8)
    @field_validator("Contrasena_Nueva")
    @classmethod
    def validateContrasena(cls, contrasena: str) -> str:
        
  
        if len(contrasena) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres.")
        if not any(char.isdigit() for char in contrasena):
            raise ValueError("La contraseña debe contener al menos un número.")
        return contrasena


class InicioSesion(BaseModel):
    Gmail: EmailStr
    Contrasena: str = Field(min_length=8)

    @field_validator("Contrasena")
    @classmethod
    def validateContrasena(cls, contrasena: str) -> str:
        
  
        if len(contrasena) < 8:
            raise ValueError("La contraseña debe tener al menos 8 caracteres.")
        if not any(char.isdigit() for char in contrasena):
            raise ValueError("La contraseña debe contener al menos un número.")
        return contrasena

class Updateuser(BaseModel):
    Nombre: str
    Apellidos: str
    Gmail: EmailStr

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