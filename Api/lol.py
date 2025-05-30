from geopy.geocoders import Nominatim

# Crear un geocodificador con un nombre de usuario personalizado
geolocator = Nominatim(user_agent="SecondTrade")

# Coordenadas de ejemplo (puedes cambiar estos valores)
latitud = 39.8874679
longitud = -4.454366

# Obtener la ubicación a partir de las coordenadas
ubicacion = geolocator.reverse((latitud, longitud), language="es")  # puedes cambiar "es" por "en" para inglés

# Mostrar resultado
if ubicacion:
    print("Dirección aproximada:", ubicacion.address)
    direccion_detallada = ubicacion.raw['address']
    print("País:", direccion_detallada.get('country', 'No disponible'))
    print("Región:", direccion_detallada.get('state', 'No disponible'))
    print("Provincia:", direccion_detallada.get('county', 'No disponible'))
    print("Ciudad o Pueblo:", direccion_detallada.get('town') or direccion_detallada.get('village') or direccion_detallada.get('city', 'No disponible'))
else:
    print("No se pudo encontrar la dirección.")
