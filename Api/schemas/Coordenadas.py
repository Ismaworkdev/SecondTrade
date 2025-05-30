from typing import Optional
from pydantic import BaseModel


class Coordenadas( BaseModel):
    lat: str
    lon: str    
    

    class Config:
        orm_mode = True
