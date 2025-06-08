
from models.Usuario import Usuario as UsuarioModel
from models.Producto import Producto as ProductoModel
from cryptography.fernet import Fernet
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from sqlalchemy import func
from fastapi.responses import JSONResponse 
from pydantic.networks import EmailStr
from fastapi import APIRouter , Response , Depends
from schemas.Usuario import InicioSesion as InicioSesionSchema
from schemas.Usuario import Usuario as UsuarioSchema
from sqlalchemy import select
import requests
from models.ImagenProducto import ImagenProducto as ImageProductoModel
from models.ProductoFavorito import ProductoFavorito as ProductoFavoritoModel
from models.Conversacion import Conversacion as ConversacionModel
from models.Mensaje import Mensaje as MensajeModel
from models.UsuarioFavorito import UsuarioFavorito as UsuarioFavoritoModel
from datetime import datetime, timedelta
import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt , JWTError
import requests
import base64
from cryptography.fernet import Fernet
import logging 
import sys
import base64
from PIL import Image
import io
import os
from dotenv import load_dotenv , dotenv_values
load_dotenv()



class UsuarioController : 

  bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
  


  def getUsers( current_user: dict ,  db):
        if current_user["id"] != 1 :  
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "No autorizado"})
        else:     
            resul = db.execute(UsuarioModel.select()).fetchall()
            lista = []
            for row in resul :
                interacion = dict(row._mapping)
                
                if interacion.get("ImgPerfil"):
                    interacion["ImgPerfil"] = base64.b64encode(interacion["ImgPerfil"]).decode("utf-8")
                    lista.append(interacion)
                    
            return lista
            
  
  def getGmailUser(Gmail , db):
    stmt = select(UsuarioModel).where(UsuarioModel.c.Gmail == Gmail)
    resul = db.execute(stmt).mappings().first()
    if resul:
        objeto = dict(resul)
        if "ImgPerfil" in objeto and objeto["ImgPerfil"]:
            objeto["ImgPerfil"] = base64.b64encode(objeto["ImgPerfil"]).decode("utf-8")
        return objeto
    return {}
  


  def UserProfile(IDUsuario , db):
    stmt = UsuarioModel.select().with_only_columns(
        UsuarioModel.c.Nombre,
        UsuarioModel.c.ImgPerfil,
        UsuarioModel.c.Ciudad_Pueblo ,
        UsuarioModel.c.Region ,
         UsuarioModel.c.IDUsuario
    ).where(UsuarioModel.c.IDUsuario == IDUsuario)

    resul = db.execute(stmt).mappings().first()

    if resul:
        objeto = dict(resul)
        img_base64 = None
        if objeto.get("ImgPerfil"):
            img_base64 = base64.b64encode(objeto["ImgPerfil"]).decode("utf-8")

    

        return {
            "Nombre": objeto.get("Nombre"),
            "ImgPerfil": img_base64,
            "Ciudad_Pueblo": objeto.get("Ciudad_Pueblo"),
            "Region": objeto.get("Region"),
             "IDUsuario": objeto.get("IDUsuario"),
            
        }

    return {}

  


  def procesar_imagen(base64_data: str, max_size_bytes=10 * 1024 * 1024):
      try:
          image_data = base64.b64decode(base64_data)
          image = Image.open(io.BytesIO(image_data))
          image.thumbnail((300,300 ))  # Redimensionar

          buffer = io.BytesIO()
          image.save(buffer, format='JPEG', quality=100)  # Comprimir
          img_bytes = buffer.getvalue()

          if len(img_bytes) > max_size_bytes:
              return None, "La imagen es demasiado grande (máx 10MB)."

          return img_bytes, None

      except Exception as e:
          return None, f"Error procesando imagen: {str(e)}"
        
  def getUserbyToken(token: dict  , db):
      
        gmail = token["Gmail"]
        return UsuarioController.getGmailUser(gmail , db)
        


  def postUser(user , db):
      img_data = user.ImgPerfil
      img_bytes = None

      if img_data and isinstance(img_data, str) and img_data.startswith("data:image"):
          try:
              header, base64_data = img_data.split(",", 1)
              img_bytes, error = UsuarioController.procesar_imagen(base64_data)

              if error:
                  return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": error})

          except Exception as e:
              print("Error al decodificar imagen:", e)
              return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Imagen inválida"})

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
          "ImgPerfil": img_bytes
      }

      new_user["Contrasena"] = UsuarioController.bcrypt_context.hash(user.Contrasena)

      try:
            if UsuarioController.getGmailUser(user.Gmail , db) != {}:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "El correo ya existe"})
            else:
                db.execute(UsuarioModel.insert().values(new_user))
                db.commit()
                email = {
                        "email": user.Gmail,
                        "subject": "Acabas de registrarte en SecondTrade",
                        "message":  f"Bienvenido {user.Nombre}"     
                    }
                response = requests.post("http://127.0.0.1:8000/email/", 
                                             json=email, 
                                             headers = {
                                              "accept": "application/json",
                                              "Content-Type": "application/json"
                                            })
                print("Código de estado:", response.status_code)
                print("Respuesta del servidor:", response.text)
                return JSONResponse(status_code=HTTP_200_OK, content={"message": "Usuario creado correctamente"})

      except Exception as e:
          print("Error al crear usuario:", e)
          return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Error al crear el usuario"}) 
        

  def putUser( user , current_user: dict , db): 
    img_data = user.ImgPerfil
    img_bytes = None
    email = False
    print(current_user)
    if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
    else:
      
      if current_user["Gmail"] != user.Gmail:
         if UsuarioController.getGmailUser(user.Gmail , db) != {}:
           email = False
           return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "este correo ya existe"})
         else: 
             email = True
      if img_data and isinstance(img_data, str) and img_data.startswith("data:image"):
        try:
            header, base64_data = img_data.split(",", 1)
            img_bytes, error = UsuarioController.procesar_imagen(base64_data)

            if error:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": error})

        except Exception as e:
            print("Error al decodificar imagen:", e)
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Imagen inválida"})

        
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

        "Contrasena": user.Contrasena if user.Contrasena.startswith("$2b$") or user.Contrasena.startswith("$2a$") else UsuarioController.bcrypt_context.hash(user.Contrasena)
      }
      if img_bytes is not None:
        update_user["ImgPerfil"] = img_bytes
      try:
        db.execute(UsuarioModel.update().values(update_user).where(UsuarioModel.c.IDUsuario == current_user["id"]))
        db.commit()
        if email == True:
          from routes.auth import get_current_user
          resul = db.execute(UsuarioModel.select().where(UsuarioModel.c.IDUsuario == current_user["id"]))
          db.commit()
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
        print("Error al actualizar usuario:" , e)
    
        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al actualizar el usuario"})


  def CambiarContrasena( Gmail , db) :
            from .Email import EmailController
            if UsuarioController.getGmailUser(Gmail , db) == {}:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
            else:   
              try:
                
                    Temporal = os.getenv("Temporal")  

                    updateContrasena = {
                      
                        "Contrasena": UsuarioController.bcrypt_context.hash(Temporal)
                    }
                    db.execute(UsuarioModel.update().values(updateContrasena).where(UsuarioModel.c.Gmail == Gmail))
                    db.commit()
                    email = {
                        "email": Gmail,
                        "subject": "Recuperación de Contraseña",
                        "message":    f"Tu contraseña temporal de recuperación es: {Temporal}\n"     
                    }
                    response = requests.post("http://127.0.0.1:8000/email/", 
                                             json=email, 
                                             headers = {
                                              "accept": "application/json",
                                              "Content-Type": "application/json"
                                            })
                    print("Código de estado:", response.status_code)
                    print("Respuesta del servidor:", response.text)

                    return JSONResponse(status_code=HTTP_200_OK , content={"message": "Contraseña actualizada correctamente"})
                   
                  
              except Exception as e:
                    print(e)
                   
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al actualizar la contraseña"})




    
  def getIDUsuario(IDUsuario , db):
    resul = db.execute(UsuarioModel.select().where(UsuarioModel.c.IDUsuario == IDUsuario)).mappings().first()
    objeto = dict(resul) if resul else {}
    return objeto 



  def deleteUser(current_user: dict , db):
    if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "El correo no existe"})
    else:
        
        
        #try:  
              subq_productos = select(ProductoModel.c.IDProducto).where(
                  ProductoModel.c.IDUsuario == current_user["id"]
              ).scalar_subquery()

              # Subquery de conversaciones asociadas al usuario (por producto o directamente)
              subq_conversaciones = select(ConversacionModel.c.IDConversacion).where(
                 
                  (ConversacionModel.c.IDUsuarioComprador == current_user["id"]) |
                  (ConversacionModel.c.IDUsuarioVendedor == current_user["id"])
              ).scalar_subquery()

              # 1. Eliminar mensajes que pertenezcan a esas conversaciones
              db.execute(MensajeModel.delete().where(
                  MensajeModel.c.IDConversacion.in_(subq_conversaciones)
              ))

              # 2. Eliminar imágenes de productos
              db.execute(ImageProductoModel.delete().where(
                  ImageProductoModel.c.IDProducto.in_(subq_productos)
              ))

              # 3. Eliminar favoritos relacionados
                # 3. Eliminar favoritos relacionados
              db.execute(UsuarioFavoritoModel.delete().where(
                        UsuarioFavoritoModel.c.IDUsuario == current_user["id"]
              ))
  
              db.execute(ProductoFavoritoModel.delete().where(
                    ProductoFavoritoModel.c.IDProducto.in_(subq_productos)
              ))
              db.execute(ProductoFavoritoModel.delete().where(  # <-- ESTA ES LA LÍNEA NUEVA
                    ProductoFavoritoModel.c.IDUsuario == current_user["id"]
              ))
              db.execute(UsuarioFavoritoModel.delete().where(
                    UsuarioFavoritoModel.c.IDUsuarioGustado == current_user["id"]
              ))


              # 4. Eliminar conversaciones (ya sin mensajes)
              db.execute(ConversacionModel.delete().where(
                  (ConversacionModel.c.IDProducto.in_(subq_productos)) |
                  (ConversacionModel.c.IDUsuarioComprador == current_user["id"]) |
                  (ConversacionModel.c.IDUsuarioVendedor == current_user["id"])
              ))

              # 5. Eliminar productos
              db.execute(ProductoModel.delete().where(
                  ProductoModel.c.IDUsuario == current_user["id"]
              ))

              # 6. Eliminar usuario
              db.execute(UsuarioModel.delete().where(
                  UsuarioModel.c.Gmail == current_user["Gmail"]
              ))

              # 7. Confirmar transacción
              db.commit()
        #except Exception as e:
         #print(e)
    
         #return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al elimiar Usuario"})      

  def deleteUseradmin( IDusuario , current_user: dict , db):
        if current_user["id"] != 1:
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "No autorizado"})
        else:
            
         try:
                subq_productos = select(ProductoModel.c.IDProducto).where(
                    ProductoModel.c.IDUsuario == IDusuario
                ).scalar_subquery()

                # Subquery de conversaciones asociadas al usuario (por producto o directamente)
                subq_conversaciones = select(ConversacionModel.c.IDConversacion).where(
                    
                    (ConversacionModel.c.IDUsuarioComprador == IDusuario) |
                    (ConversacionModel.c.IDUsuarioVendedor == IDusuario)
                ).scalar_subquery()

                # 1. Eliminar mensajes que pertenezcan a esas conversaciones
                db.execute(MensajeModel.delete().where(
                    MensajeModel.c.IDConversacion.in_(subq_conversaciones)
                ))

                # 2. Eliminar imágenes de productos
                db.execute(ImageProductoModel.delete().where(
                    ImageProductoModel.c.IDProducto.in_(subq_productos)
                ))

                # 3. Eliminar favoritos relacionados
                db.execute(UsuarioFavoritoModel.delete().where(
                            UsuarioFavoritoModel.c.IDUsuario == IDusuario
                ))
    
                db.execute(ProductoFavoritoModel.delete().where(
                        ProductoFavoritoModel.c.IDProducto.in_(subq_productos)
                ))
                db.execute(ProductoFavoritoModel.delete().where(  
                        ProductoFavoritoModel.c.IDUsuario == IDusuario
                ))
                db.execute(UsuarioFavoritoModel.delete().where(
                        UsuarioFavoritoModel.c.IDUsuarioGustado == IDusuario
                ))

                # 4. Eliminar conversaciones (ya sin mensajes)
                db.execute(ConversacionModel.delete().where(
                    (ConversacionModel.c.IDProducto.in_(subq_productos)) |
                    (ConversacionModel.c.IDUsuarioComprador == IDusuario) |
                    (ConversacionModel.c.IDUsuarioVendedor == IDusuario)
                ))

                # 5. Eliminar productos
                db.execute(ProductoModel.delete().where(
                    ProductoModel.c.IDUsuario == IDusuario
                ))

                # 6. Eliminar usuario
                db.execute(UsuarioModel.delete().where(
                    UsuarioModel.c.IDUsuario == IDusuario
                ))

                # 7. Confirmar transacción
                db.commit()
         except Exception as e:
           print(e)
    
           return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al elimiar Usuario"})      











