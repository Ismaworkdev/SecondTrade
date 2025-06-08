from typing import Optional
from pydantic import BaseModel
from datetime import date



class Producto(BaseModel):
   
    Titulo : str
    Descripcion: str
    Estado: str
    Fecha_hora_subida: str
    Precio: float
    Categoria: str
 

    class Config:
        orm_mode = True


class ProductoEdit(BaseModel):
    IDProducto: Optional[int]
    IDUsuario : int
    Titulo : str
    Descripcion: str
    Estado: str
    Fecha_hora_subida: str
    Precio: float
    Categoria: str


    class Config:
        orm_mode = True
        

