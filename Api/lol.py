from geopy.geocoders import Nominatim

# Crear un geocodificador con un nombre de usuario personalizado
geolocator = Nominatim(user_agent="SecondTrade")

# Dirección a buscar
direccion = "plaza España , el carpio de tajo toledo , Castilla La mancha , España"

# Obtener ubicación
ubicacion = geolocator.geocode(direccion)

# Mostrar resultado
if ubicacion:
    print("Dirección encontrada:", ubicacion.address)
    print("Latitud:", ubicacion.latitude)
    print("Longitud:", ubicacion.longitude)
else:
    print("No se pudo encontrar la dirección.")
