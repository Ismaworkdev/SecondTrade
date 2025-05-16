from config.db import conexion
from models.Usuario import Usuario as UsuarioModel
from cryptography.fernet import Fernet
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
 
from fastapi.responses import JSONResponse 
from pydantic.networks import EmailStr
from fastapi import APIRouter , Response , Depends
from schemas.Usuario import InicioSesion as InicioSesionSchema
from datetime import datetime, timedelta
import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt , JWTError
import requests

from cryptography.fernet import Fernet
import logging 
import sys



class UsuarioController : 

  bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
  


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
    new_user["Contrasena"] = UsuarioController.bcrypt_context.hash(user.Contrasena)
    try:
        if UsuarioController.getGmailUser(user.Gmail) != {}:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo ya existe"})
        else:
            
         conexion.execute(UsuarioModel.insert().values(new_user))
         conexion.commit()   
        return JSONResponse(status_code=HTTP_200_OK , content={"message": "Usuario creado correctamente"})
    except Exception as e:
        print(e)
        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al crear el usuario"})  


  def putUser( user , current_user: dict) : 
    email = False
    print(current_user)
    if UsuarioController.getGmailUser(current_user["Gmail"]) == {}:
        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
    else:
      
      if current_user["Gmail"] != user.Gmail:
         if UsuarioController.getGmailUser(user.Gmail) != {}:
           email = False
           return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "este correo ya existe"})
         else: 
           email = True
      
        
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
        "ImgPerfil": user.ImgPerfil , 
        "Contrasena": UsuarioController.bcrypt_context.hash(user.Contrasena)
      }
      try:
        conexion.execute(UsuarioModel.update().values(update_user).where(UsuarioModel.c.IDUsuario == current_user["id"]))
        conexion.commit()
        if email == True:
          from routes.auth import get_current_user
          resul = conexion.execute(UsuarioModel.select().where(UsuarioModel.c.IDUsuario == current_user["id"]))
          conexion.commit()
          usuario = dict(resul.mappings().first())
          print(usuario)
          response = requests.post("http://localhost:8000/auth/token", data={
            "username": user.Gmail,
            "password": user.Contrasena, 
            "id" : current_user["id"]
          })
          token_data = response.json()
          print(token_data)
          

          
          
         
        return JSONResponse(status_code=HTTP_200_OK , content={"message": "Usuario actualizado correctamente"})
      except Exception as e:
    
        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al actualizar el usuario"})


#  def CambiarContrasena( user , current_user: dict) :
#            if UsuarioController.getGmailUser(current_user["Gmail"]) == {}:
#                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
#            else:   
#              try:
#                
#                 if not UsuarioController.bcrypt_context.verify(user.Contrasena_antigua, UsuarioController.getGmailUser(current_user["Gmail"])["Contrasena"]):
#                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "La contraseña antigua no es correcta"})
#                 else:
#                    updateContrasena = {
#                      
#                        "Contrasena": UsuarioController.bcrypt_context.hash(user.Contrasena_Nueva)
#                    }
#                    conexion.execute(UsuarioModel.update().values(updateContrasena).where(UsuarioModel.c.Gmail == current_user["Gmail"]))
#                    conexion.commit()
#                    return JSONResponse(status_code=HTTP_200_OK , content={"message": "Contraseña actualizada correctamente"})
#                
#                  
#              except Exception as e:
#                   
#                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al actualizar la contraseña"})  
    




  def deleteUser(current_user: dict):
    if UsuarioController.getGmailUser(current_user["Gmail"]) == {}:
        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
    else:
        try:
            conexion.execute(UsuarioModel.delete().where(UsuarioModel.c.Gmail == current_user["Gmail"]))
            conexion.commit()
            return JSONResponse(status_code=HTTP_200_OK , content={"message": "Usuario eliminado correctamente"})
        except Exception as e:
        
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar el usuario"})
  
  def getIDUsuario(IDUsuario):
    resul = conexion.execute(UsuarioModel.select().where(UsuarioModel.c.IDUsuario == IDUsuario)).mappings().first()
    objeto = dict(resul) if resul else {}
    return objeto 


