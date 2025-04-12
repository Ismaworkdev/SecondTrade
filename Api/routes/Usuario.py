
from fastapi import APIRouter

Usuario = APIRouter()

@Usuario.get("/users")
def hello_usuario():
    return {"message": "Hello lol"}