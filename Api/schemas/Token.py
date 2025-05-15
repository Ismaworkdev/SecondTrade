from pydantic import BaseModel
from typing import Optional
from pydantic import BaseModel
from datetime import date



class Token(BaseModel):
    access_token: str
    token_type: str
    
class CustomLoginForm(BaseModel):
    username: str
    password: str
    id: Optional[int] = None
    
    class Config:
        orm_mode = True    
    