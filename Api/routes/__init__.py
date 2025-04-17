from fastapi import APIRouter
from routes import Usuario , Producto , Conversacion , Mensaje  , ImagenProducto

router = APIRouter()

router.include_router(Usuario.route, prefix="/usuario", tags=["Usuario"])
router.include_router(Producto.route, prefix="/producto", tags=["Producto"])
router.include_router(ImagenProducto.route, prefix="/imagenproducto", tags=["ImagenProducto"])
#router.include_router(Conversacion.route, prefix="/conversacion", tags=["Conversacion"])
#router.include_router(Mensaje.route, prefix="/mensaje", tags=["Mensaje"])

__all__ = ["router"]
