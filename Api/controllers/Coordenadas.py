from starlette.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR , HTTP_200_OK
from fastapi.responses import JSONResponse
from geopy.geocoders import Nominatim
from schemas.Coordenadas import Coordenadas as CoordenadasSchema
from random import shuffle
import time



class CoordenadasController : 
    
    randoms = [
        "my-app-01", "my-app-02", "my-app-03", "my-app-04", "my-app-05",
        "my-app-06", "my-app-07", "my-app-08", "my-app-09", "my-app-10"
    ]
    def getZona(Coordenadas: CoordenadasSchema):
        adress = {}
        users = CoordenadasController.randoms[:]
        shuffle(users)
        for user in users:
            geolocator = Nominatim(user_agent=user , timeout=10)
            ubicacion = geolocator.reverse((Coordenadas.lat, Coordenadas.lon), language="es")
            if ubicacion:
                    

                calle = ubicacion.raw.get("address", {}).get("road", "") or \
                        ubicacion.raw.get("address", {}).get("pedestrian", "") or \
                        ubicacion.raw.get("address", {}).get("footway", "")
                ciudad = ubicacion.raw.get("address", {}).get("city", "") or \
                        ubicacion.raw.get("address", {}).get("town", "") or \
                        ubicacion.raw.get("address", {}).get("village", "")
                provincia = ubicacion.raw.get("address", {}).get("state", "") or \
                            ubicacion.raw.get("address", {}).get("county", "")
                pais = ubicacion.raw.get("address", {}).get("country", "")            
                
                adress = {
                    "calle": calle,
                    "ciudad": ciudad,
                    "provincia": provincia,
                    "pais": pais
                }

                return JSONResponse(status_code=HTTP_200_OK , content={"message": adress , "status": "success"})
            else:
                return JSONResponse(status_code=HTTP_400_BAD_REQUEST , content={"message": "No se pudo encontrar la dirección."})    
        