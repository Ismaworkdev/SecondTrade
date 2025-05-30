
from fastapi import APIRouter , Response , Depends
from schemas.Usuario import Usuario as UsuarioSchema
from schemas.Usuario import CambiarContrasena as CambiarContrasenaSchema
from schemas.Usuario import InicioSesion as InicioSesionSchema
from schemas.Usuario import Updateuser as UpdateuserSchema
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session
from controllers.Usuario import UsuarioController
from config.db import get_db
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "Usuario"



@route.get("/")
def getUsers():
    return UsuarioController.getUsers()

@route.get("/getuser/")
def getUserbyToken(token: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return UsuarioController.getUserbyToken(token , db )

@route.get("/Gmail/{Gmail}")
def getGmailUser(Gmail: EmailStr , db: Session = Depends(get_db)):
       return UsuarioController.getGmailUser(Gmail , db)
   
@route.get("/IDUsuario/{IDUsuario}")
def getIDUsuario(IDUsuario: int):
       return UsuarioController.getIDUsuario(IDUsuario)
   
@route.get("/UserProfile/{IDUsuario}")
def UserProfile(IDUsuario: int , db: Session = Depends(get_db)):
       return UsuarioController.UserProfile(IDUsuario , db)

@route.post("/")
def postUser(user: UsuarioSchema , db: Session = Depends(get_db)):
    return auth_postUser(user , db)


@route.put("/")
def putUser(user: UsuarioSchema , current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return UsuarioController.putUser(user, current_user , db)

@route.put("/CambiarContrasena/")
def CambiarContrasena(user: CambiarContrasenaSchema ,  current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return UsuarioController.CambiarContrasena( user ,  current_user , db)



@route.delete("/")
def deleteUser(current_user: dict = Depends(get_current_user) , db: Session = Depends(get_db)):
    return UsuarioController.deleteUser(current_user , db)