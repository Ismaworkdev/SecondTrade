
from fastapi import APIRouter , Response , Depends
from schemas.Usuario import Usuario as UsuarioSchema
from schemas.Usuario import CambiarContrasena as CambiarContrasenaSchema
from schemas.Usuario import InicioSesion as InicioSesionSchema
from schemas.Usuario import Updateuser as UpdateuserSchema
from pydantic.networks import EmailStr
from controllers.Usuario import UsuarioController
from .auth import postUser as auth_postUser , get_current_user
route = APIRouter()
namespace = "Usuario"



@route.get("/")
def getUsers():
    return UsuarioController.getUsers()

@route.get("/Gmail/{Gmail}")
def getGmailUser(Gmail: EmailStr):
       return UsuarioController.getGmailUser(Gmail)
   
@route.get("/IDUsuario/{IDUsuario}")
def getIDUsuario(IDUsuario: int):
       return UsuarioController.getIDUsuario(IDUsuario)

@route.post("/")
def postUser(user: UsuarioSchema):
    return auth_postUser(user)

#@route.post("/InicioSesion")
#def InicioSesion(user: InicioSesionSchema):
#    return UsuarioController.InicioSesion(user)


@route.put("/")
def putUser(user: UpdateuserSchema , current_user: dict = Depends(get_current_user)):
    return UsuarioController.putUser(user, current_user)

@route.put("/CambiarContrasena/")
def CambiarContrasena(user: CambiarContrasenaSchema ,  current_user: dict = Depends(get_current_user) ):
    return UsuarioController.CambiarContrasena( user ,  current_user)



@route.delete("/")
def deleteUser(current_user: dict = Depends(get_current_user)):
    return UsuarioController.deleteUser(current_user)