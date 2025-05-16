from typing import Optional
from pydantic import BaseModel
from datetime import date


class Email(BaseModel):
    email: str
    subject: str
    message: str
    
    class Config:
     orm_mode = True