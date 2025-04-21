from config.db import conexion
from models.Usuario import Usuario as UsuarioModel
from cryptography.fernet import Fernet
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import Response
from pydantic.networks import EmailStr
from fastapi import APIRouter, HTTPException




class UsuarioController : 
  Unique_key = Fernet.generate_key()
  function_Fernet = Fernet(Unique_key)

  def getUsers():
    resul = conexion.execute(UsuarioModel.select()).fetchall()
    lista = [dict(row._mapping) for row in resul]
    return lista
  
  def getGmailUser(Gmail):
    resul = conexion.execute(UsuarioModel.select().where(UsuarioModel.c.Gmail == Gmail)).mappings().first()
    objeto = dict(resul) if resul else {}
    return objeto
  
  def postUser(user):
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
    new_user["Contrasena"] = UsuarioController.function_Fernet.encrypt(user.Contrasena.encode("utf-8"))
    try:
        if UsuarioController.getGmailUser(user.Gmail) != {}:
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo ya existe"})
        else:
            
         conexion.execute(UsuarioModel.insert().values(new_user))
         conexion.commit()   
        return Response(status_code=HTTP_200_OK , content={"message": "Usuario creado correctamente"})
    except Exception as e:
        
        return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al crear el usuario"})  

  def putUser(Gmail , user) : 
    if UsuarioController.getGmailUser(Gmail) == {}:
        return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
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
      update_user["Contrasena"] = UsuarioController.function_Fernet.encrypt(user.Contrasena.encode("utf-8"))
      try:
        conexion.execute(UsuarioModel.update().values(update_user).where(UsuarioModel.c.Gmail == Gmail))
        conexion.commit()
        return Response(status_code=HTTP_200_OK , content={"message": "Usuario actualizado correctamente"})
      except Exception as e:
    
        return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al actualizar el usuario"})


  def CambiarContrasena(Gmail , user) :
            if UsuarioController.getGmailUser(Gmail) == {}:
                return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
            else:   
                try:
                    userAntigua = UsuarioController.getGmailUser(Gmail)["Contrasena"]
                    if Fernet(UsuarioController.Unique_key).decrypt(userAntigua.encode("utf-8")).decode("utf-8") != user.Contrasena_antigua:
                        return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "La contraseña antigua no es correcta"})
                    else:
                        new_user = {
                            "Contrasena": UsuarioController.function_Fernet.encrypt(user.Contrasena_Nueva.encode("utf-8"))
                        }
                        conexion.execute(UsuarioModel.update().values(new_user).where(UsuarioModel.c.Gmail == Gmail))
                        conexion.commit()
                        return Response(status_code=HTTP_200_OK , content={"message": "Contraseña actualizada correctamente"})
                except Exception as e:
                   
                    return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al actualizar la contraseña"})  
    




  def deleteUser(Gmail):
    if UsuarioController.getGmailUser(Gmail) == {}:
        return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
    else:
        try:
            conexion.execute(UsuarioModel.delete().where(UsuarioModel.c.Gmail == Gmail))
            conexion.commit()
            return Response(status_code=HTTP_200_OK , content={"message": "Usuario eliminado correctamente"})
        except Exception as e:
        
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar el usuario"})
  
  def getIDUsuario(IDUsuario):
    resul = conexion.execute(UsuarioModel.select().where(UsuarioModel.c.IDUsuario == IDUsuario)).mappings().first()
    objeto = dict(resul) if resul else {}
    return objeto 


def InicioSesion(user):
    resul = conexion.execute(UsuarioModel.select().where(UsuarioModel.c.Gmail == user.Gmail)).mappings().first()
    objeto = dict(resul) if resul else {}
    if objeto == {}:
        return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
    else:
        try:
            userAntigua = UsuarioController.getGmailUser(user.Gmail)["Contrasena"]
            if Fernet(UsuarioController.Unique_key).decrypt(userAntigua.encode("utf-8")).decode("utf-8") != user.Contrasena:
                return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "La contraseña no es correcta"})
            else:
                return Response(status_code=HTTP_200_OK , content={"message": "Inicio de sesión correcto"})
        except Exception as e:
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al iniciar sesión"})       