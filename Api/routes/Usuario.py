
from fastapi import APIRouter , Response
from config.db import conexion
from models.Usuario import Usuario as UsuarioModel
from schemas.Usuario import Usuario as UsuarioSchema
from cryptography.fernet import Fernet
from pydantic.networks import EmailStr
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
Usuario = APIRouter()

Unique_key = Fernet.generate_key()
function_Fernet = Fernet(Unique_key)
@Usuario.get("/Usuario")
def getUsers():
    resul = conexion.execute(UsuarioModel.select()).fetchall()
    lista = [dict(row._mapping) for row in resul]
    return lista

@Usuario.get("/Usuario/Gmail/{Gmail}")
def getGmailUser(Gmail):
    resul = conexion.execute(UsuarioModel.select().where(UsuarioModel.c.Gmail == Gmail)).mappings().first()
    objeto = dict(resul) if resul else {}
    return objeto

@Usuario.post("/Usuario")
def postUser(user: UsuarioSchema):
    new_user = {
        "Nombre": user.Nombre,
        "Apellidos": user.Apellidos,
        "Gmail": user.Gmail,
        "Telefono": user.Telefono,
        "Calle": user.Calle,
        "Ciudad_Pueblo": user.Ciudad_Pueblo,
        "Provincia": user.Provincia,
        "Region": user.Region,
        "Codigo_postal": user.Codigo_postal,
        "Fecha_nacimiento": user.Fecha_nacimiento,
        "ImgPerfil": user.ImgPerfil
     }
    new_user["Contrasena"] = function_Fernet.encrypt(user.Contrasena.encode("utf-8"))
    try:
        if getGmailUser(user.Gmail) != {}:
            return Response(status_code=HTTP_400_BAD_REQUEST)
        else:
            
         conexion.execute(UsuarioModel.insert().values(new_user))
         conexion.commit()   
        return Response(status_code=HTTP_201_CREATED)
    except Exception as e:
        print(e)
        return Response(status_code=HTTP_400_BAD_REQUEST)      

@Usuario.put("/Usuario/{Gmail}")
def putUser(Gmail: EmailStr, user: UsuarioSchema):
    if getGmailUser(Gmail) == {}:
        return Response(status_code=HTTP_204_NO_CONTENT)
    else:
      update_user = {
        "Nombre": user.Nombre,
        "Apellidos": user.Apellidos,
        "Gmail": user.Gmail,
        "Telefono": user.Telefono,
        "Calle": user.Calle,
        "Ciudad_Pueblo": user.Ciudad_Pueblo,
        "Provincia": user.Provincia,
        "Region": user.Region,
        "Codigo_postal": user.Codigo_postal,
        "Fecha_nacimiento": user.Fecha_nacimiento,
        "ImgPerfil": user.ImgPerfil
      }
      update_user["Contrasena"] = function_Fernet.encrypt(user.Contrasena.encode("utf-8"))
      try:
        conexion.execute(UsuarioModel.update().values(update_user).where(UsuarioModel.c.Gmail == Gmail))
        conexion.commit()
        return Response(status_code=HTTP_201_CREATED)
      except Exception as e:
        print(e)
        return Response(status_code=HTTP_400_BAD_REQUEST)




@Usuario.delete("/Usuario/{Gmail}")

  