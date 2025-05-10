from  models.ImagenProducto import ImagenProducto as ImagenProductoModel
from config.db import conexion
from schemas.ImagenProducto import ImagenProducto as ImagenProductoSchema
from schemas.ImagenProducto import EditImage as EditImageSchema
from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import Response

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
    
    def postImagen(imagen: ImagenProductoSchema):
        new_imagen = {
            "IDProducto": imagen.IDProducto,
            "Img": imagen.Img
        }
        try:
            conexion.execute(ImagenProductoModel.insert().values(new_imagen))
            conexion.commit()
            return Response(status_code=HTTP_200_OK , content={"message": "Imagen guardada correctamente"})
        except Exception as e:
           
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al guardar la imagen"})
        
    def putImagen( imagen: EditImageSchema):
        if ImagenProductoController.getImage(imagen.IDImagen) == {}:
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "No se encontró la imagen"})
        else:
            update_imagen = {
                "Img": imagen.Img
            }
            try:
                conexion.execute(ImagenProductoModel.update().values(update_imagen).where(ImagenProductoModel.c.IDImagen == IDImagen))
                conexion.commit()
                return Response(status_code=HTTP_200_OK , content={"message": "Imagen actualizada correctamente"})
            except Exception as e:
               
                return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al actualizar la imagen"})
            
    def deleteImagen(IDImagen: int):
        if ImagenProductoController.getImage(IDImagen) == {}:
            return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "No se encontró la imagen"})
        else:
            try:
                conexion.execute(ImagenProductoModel.delete().where(ImagenProductoModel.c.IDImagen == IDImagen))
                conexion.commit()
                return Response(status_code=HTTP_200_OK , content={"message": "Imagen eliminada correctamente"})
            except Exception as e:
                
                return Response(status_code=HTTP_400_BAD_REQUEST , content={"message": "Error al eliminar la imagen"})   