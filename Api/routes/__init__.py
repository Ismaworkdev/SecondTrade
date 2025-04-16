from fastapi import APIRouter
from Api.routes import Usuario , Producto , Conversacion , Mensaje 

router = APIRouter()

router.include_router(Usuario.router, prefix="/usuario", tags=["Usuario"])
router.include_router(Producto.router, prefix="/producto", tags=["Producto"])
router.include_router(Conversacion.router, prefix="/conversacion", tags=["Conversacion"])
router.include_router(Mensaje.router, prefix="/mensaje", tags=["Mensaje"])

__all__ = ["router"]
