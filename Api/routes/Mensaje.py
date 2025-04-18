
from fastapi import APIRouter
from config.db import conexion
from models.Mensaje import Mensaje as MensajeModel
from schemas.Mensaje import Mensaje as MensajeSchema

route = APIRouter()
namespace = "Mensaje"

