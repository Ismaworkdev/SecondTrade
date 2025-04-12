from fastapi import FastAPI
from routes.Usuario import Usuario
app = FastAPI()

app.include_router(Usuario)