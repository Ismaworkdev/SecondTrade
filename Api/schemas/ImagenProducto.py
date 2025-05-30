from typing import Optional
from pydantic import BaseModel
from datetime import date

class ImagenProducto(BaseModel):
  
    img: str  
    IDProducto: int
    
    

    class Config:
        orm_mode = True
        
        
class EditImage(BaseModel):
    IDImagen: Optional[int]
    Img: Optional[bytes]

    class Config:
        orm_mode = True
        

class DeleteImage(BaseModel):
    IDImagen: Optional[int]
    IDProducto: Optional[int]

    class Config:
        orm_mode = True