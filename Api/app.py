from fastapi import FastAPI
from config.db import engine, metaDatos
from routes.Usuario import Usuario
from routes.Producto import Producto
from routes.ProductoFavorito import ProductoFavorito
from routes.UsuarioFavorito import UsuarioFavorito
from routes.ImagenProducto import ImagenProducto
from routes.Conversacion import Conversacion
from routes.Mensaje import Mensaje
app = FastAPI()
metaDatos.drop_all(bind=engine)
metaDatos.create_all(bind=engine)
app.include_router(Usuario)
app.include_router(Producto)
app.include_router(ProductoFavorito)
app.include_router(UsuarioFavorito)
app.include_router(ImagenProducto)
app.include_router(Conversacion)
app.include_router(Mensaje)

@app.get("/")
def root():
    return {"message": "Welcome to my API"}