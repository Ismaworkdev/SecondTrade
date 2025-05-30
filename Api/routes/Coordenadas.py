from fastapi import APIRouter, Response, Depends
from schemas.Coordenadas import Coordenadas as CoordenadasSchema
from controllers.Coordenadas import CoordenadasController
route = APIRouter()
namespace = "Coordenadas"

@route.get("/{lat}/{lon}")
def getZona(lat: str, lon: str):
    Coordenadas = CoordenadasSchema(lat=lat, lon=lon)
    return CoordenadasController.getZona(Coordenadas)
