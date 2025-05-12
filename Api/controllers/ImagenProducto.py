from  models.ImagenProducto import ImagenProducto as ImagenProductoModel 
from models.Usuario import Usuario as UsuariomMdel
from models.Producto import Producto as ProductoModel
from config.db import conexion
from schemas.ImagenProducto import ImagenProducto as ImagenProductoSchema
from schemas.ImagenProducto import EditImage as EditImageSchema
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import JSONResponse

from .Usuario import UsuarioController

class ImagenProductoController:
    
    def getImagenes():
        resul = conexion.execute(ImagenProductoModel.select()).fetchall()
        lista = [dict(row._mapping) for row in resul]
        return lista
    
    def getImagesOfProducto(IDProducto: int):
        
        resul = conexion.execute(ImagenProductoModel.select().where(ImagenProductoModel.c.IDProducto == IDProducto)).fetchall()
        lista = [dict(row._mapping) for row in resul]
        return lista
    
    def getImage(IDImagen: int):
         resul = conexion.execute(ImagenProductoModel.select().where(ImagenProductoModel.c.IDImagen == IDImagen)).mappings().first()
         objeto = dict(resul) if resul else {}
         return objeto
    
    def postImagen(imagen , current_user: dict):
               
                
                if UsuarioController.getGmailUser(current_user["Gmail"]) == {}:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
                else:
                 resul = conexion.execute(ProductoModel.select().where((ProductoModel.c.IDProducto == imagen.IDProducto) & (ProductoModel.c.IDUsuario == current_user["id"]))).mappings().first()

                 
                 if resul == {}:
                        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "No se te permite agregar esta imagen"})
                 else:
                                         try: 
                                                new_img= {
                                                "img": imagen.img ,
                                                "IDProducto": imagen.IDProducto 
                                                
                                                }
                
                                                conexion.execute(ImagenProductoModel.insert().values(new_img))
                                                conexion.commit()
                                                return JSONResponse(status_code=HTTP_201_CREATED , content={"message": "Imagen agregada correctamente"})
                                         except Exception as e:
                                                
                                                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al agregar la imagen"})



                        
                

        

        
       
       
       

            
    def deleteImagen(Image , current_user: dict):
                print(Image)
                print(current_user)

                if UsuarioController.getGmailUser(current_user["Gmail"]) == {}:
                    return JSONResponse(status_code=HTTP_400_BAD_REQUEST ,content="El correo no existe")
                
                else:
                 resul = conexion.execute(ProductoModel.select().where((ProductoModel.c.IDProducto == Image.IDProducto) & (ProductoModel.c.IDUsuario == current_user["id"]))).mappings().first()

                 
                 if resul == {}:
                       
                        return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "No se te permite agregar esta imagen"})
                 else:
                                         try: 
                                                
                
                                                conexion.execute(ImagenProductoModel.delete().where(ImagenProductoModel.c.IDImagen == Image.IDImagen))
                                                conexion.commit()
                                                return JSONResponse(status_code=HTTP_201_CREATED , content={"message": "Imagen eliminada correctamente"})
                                         except Exception as e:
                                                print(e)
                                                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar la imagen"})
                     
                     