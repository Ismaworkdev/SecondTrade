
from fastapi import APIRouter , Response
from schemas.Usuario import Usuario as UsuarioSchema
from schemas.Usuario import CambiarContrasena as CambiarContrasenaSchema
from schemas.Usuario import InicioSesion as InicioSesionSchema
from pydantic.networks import EmailStr
from controllers.Usuario import UsuarioController
from .auth import postUser as auth_postUser
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


@route.put("/{Gmail}")
def putUser(Gmail: EmailStr, user: UsuarioSchema):
    return UsuarioController.putUser(Gmail, user)

@route.put("/CambiarContrasena/{Gmail}")
def CambiarContrasena(Gmail: EmailStr, user: CambiarContrasenaSchema):
    return UsuarioController.CambiarContrasena(Gmail, user)



@route.delete("/{Gmail}")
def deleteUser(Gmail: EmailStr):
    return UsuarioController.deleteUser(Gmail)