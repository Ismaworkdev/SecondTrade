from fastapi import APIRouter
from routes import Usuario , Producto , Conversacion , Mensaje  , ImagenProducto , ProductoFavorito , UsuarioFavorito , auth , Email , Coordenadas

router = APIRouter()

router.include_router(Usuario.route, prefix="/usuario", tags=["Usuario"])
router.include_router(Producto.route, prefix="/producto", tags=["Producto"])
router.include_router(ImagenProducto.route, prefix="/imagenproducto", tags=["ImagenProducto"])
router.include_router(Conversacion.route, prefix="/conversacion", tags=["Conversacion"])
router.include_router(Mensaje.route, prefix="/mensaje", tags=["Mensaje"])
router.include_router(ProductoFavorito.route, prefix="/productofavorito", tags=["ProductoFavorito"])
router.include_router(UsuarioFavorito.route, prefix="/usuarioFavorito", tags=["UsuarioFavorito"])
router.include_router(auth.route, prefix="/auth", tags=["Auth"])
router.include_router(Email.route, prefix="/email", tags=["Email"])
router.include_router(Coordenadas.route, prefix="/Coordenadas", tags=["Coordenadas"])

__all__ = ["router"]
