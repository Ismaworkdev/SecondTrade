from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from config.db import SessionLocal , conexion
from models.Usuario import Usuario as UsuarioModel 
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt , JWTError
from schemas.Usuario import Usuario , CambiarContrasena , InicioSesion
from  controllers.Usuario import UsuarioController
from schemas.Token import Token
from sqlalchemy import select
import os
from dotenv import load_dotenv , dotenv_values
load_dotenv()
router = APIRouter()
namespace = "auth"
SECRET_KEY = os.getenv("SECRET_KEY")  
  
ALGORITHM = os.getenv("ALGORITHM")

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")





def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]



def   postUser(user):
       return UsuarioController.postUser(user)
   
   
@router.post("/token" , response_model=Token)
async def login_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency ):
    user = authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Gmail or Contrasena",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(user.Gmail , user.IDUsuario , timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}     
    
    
def authenticate_user(db: db_dependency, Gmail: str, Contrasena: str):
   stmt = select(UsuarioModel).where(UsuarioModel.c.Gmail == Gmail)
   result = db.execute(stmt).first()

   if not result:
       return False
   if not bcrypt_context.verify(Contrasena, result.Contrasena):
        return False
   return result


from datetime import datetime, timedelta, timezone

def create_access_token(Gmail: str, IDUsuario: int, expires_delta: timedelta | None = None):
    encode = {"sub": Gmail, "id": IDUsuario}
    expires = datetime.now(timezone.utc) + expires_delta if expires_delta else datetime.now(timezone.utc)
    encode.update({"exp": expires})
    token = jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
    return token


async def get_current_user(token: Annotated[str , Depends(oauth2_bearer)]):
            try:
              payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
              Gmail: str = payload.get("sub")
              IDUsuario: int = payload.get("id")
              print(Gmail)
              print(IDUsuario)
              if Gmail is None or IDUsuario is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials", headers={"WWW-Authenticate": "Bearer"})
              return {"Gmail": Gmail, "id": IDUsuario}
            except JWTError:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials", headers={"WWW-Authenticate": "Bearer"})
     
          