from typing import Optional
from pydantic import BaseModel
from datetime import date

class ImagenProducto(BaseModel):
    IDImagen: Optional[int]
    IDProducto: int
    Img: bytes
    

    class Config:
        orm_mode = True
        
        
class EditImage(BaseModel):
    IDImagen: Optional[int]
    Img: Optional[bytes]

    class Config:
        orm_mode = True