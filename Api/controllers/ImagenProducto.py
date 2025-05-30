from  models.ImagenProducto import ImagenProducto as ImagenProductoModel 
from models.Usuario import Usuario as UsuariomMdel
from models.Producto import Producto as ProductoModel

from schemas.ImagenProducto import ImagenProducto as ImagenProductoSchema
from schemas.ImagenProducto import EditImage as EditImageSchema
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import JSONResponse
import base64
from .Usuario import UsuarioController

class ImagenProductoController:
    
    def getImagenes( db):
        resul = db.execute(ImagenProductoModel.select()).fetchall()
        lista = [dict(row._mapping) for row in resul]
        return lista
    


    def getImagesOfProducto(IDProducto: int, db):
        resul = db.execute(
            ImagenProductoModel.select().where(ImagenProductoModel.c.IDProducto == IDProducto)
        ).fetchall()

        lista = []
        for row in resul:
            dict_row = dict(row._mapping)

            # Convertir campo 'img' (BLOB) a base64, si existe
            if dict_row.get("img") is not None:
                dict_row["img"] = base64.b64encode(dict_row["img"]).decode("utf-8")

            lista.append(dict_row)

        return lista

    
    def getImage(IDImagen: int , db):
         resul = db.execute(ImagenProductoModel.select().where(ImagenProductoModel.c.IDImagen == IDImagen)).mappings().first()
         objeto = dict(resul) if resul else {}
         return objeto
    
    def postImagen(imagen , current_user: dict , db):
      print(imagen)
      img_data = imagen.img
      img_bytes = None

      if img_data and isinstance(img_data, str):
            try:
                base64_data = img_data.strip()
                img_bytes, error = UsuarioController.procesar_imagen(base64_data)
                
                if error:
                  return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": error})

              

            except Exception as e:
                print("Error al decodificar imagen:", e)
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST, content={"message": "Imagen inválida"})
      new_img= {
                "img": img_bytes ,
                "IDProducto": imagen.IDProducto 
                }   
      try:
       db.execute(ImagenProductoModel.insert().values(new_img))
       db.commit()
       return JSONResponse(status_code=HTTP_201_CREATED , content={"message": "Imagen agregada correctamente"})
      except Exception as e:
            print("Error al decodificar imagen:", e)
            return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al agregar la imagen"})
      
     

                                   
                                                 
                                          



                     


        

        
       
       
       

            
    def deleteImagen(IDProducto , current_user: dict , db):
                

                if UsuarioController.getGmailUser(current_user["Gmail"] , db) == {}:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
                
                else:
                 resul = db.execute(ProductoModel.select().where((ProductoModel.c.IDProducto == IDProducto) & (ProductoModel.c.IDUsuario == current_user["id"]))).mappings().first()

                 
                 if resul == {}:
                       
                        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "No se te permite agregar esta imagen"})
                 else:
                                         try: 
                                                
                
                                                db.execute(ImagenProductoModel.delete().where(ImagenProductoModel.c.IDProducto == IDProducto))
                                                db.commit()
                                                return JSONResponse(status_code=HTTP_201_CREATED , content={"message": "Imagen eliminada correctamente"})
                                         except Exception as e:
                                                print(e)
                                                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar la imagen"})
                     
                     