
from fastapi import APIRouter , Response
from schemas.Usuario import Usuario as UsuarioSchema
from pydantic.networks import EmailStr
from controllers.Usuario import UsuarioController
route = APIRouter()
namespace = "Usuario"



@route.get("/")
def getUsers():
    return UsuarioController.getUsers()

@route.get("/Gmail/{Gmail}")
def getGmailUser(Gmail: EmailStr):
       return UsuarioController.getGmailUser(Gmail)

@route.post("/")
def postUser(user: UsuarioSchema):
    return UsuarioController.postUser(user)

@route.put("/{Gmail}")
def putUser(Gmail: EmailStr, user: UsuarioSchema):
    return UsuarioController.putUser(Gmail, user)




@route.delete("/{Gmail}")
def deleteUser(Gmail: EmailStr):
    return UsuarioController.deleteUser(Gmail)