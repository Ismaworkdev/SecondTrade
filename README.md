# SecondTrade 

**SecondTrade** es una plataforma  web completa para el comercio de segunda mano, desarrollada como Trabajo de Fin de Grado (TFG). El proyecto incluye un frontend en React y una API backend en FastAPI.

## Arquitectura del Proyecto

```
SecondTrade/
├── Front/          # Frontend - React + Vite + TailwindCSS
└── Api/            # Backend API - FastAPI + SQLAlchemy + phpmyAdmin
```

##  Tecnologías

### Frontend
- **React 19** - Biblioteca de JavaScript para UI
- **Vite** - Herramienta de desarrollo rápida
- **TailwindCSS** - Framework CSS utilitario
- **React Router** - Enrutamiento
- **Leaflet** - Mapas interactivos
- **Lucide React** - Iconos modernos

### Backend
- **FastAPI** - Framework web moderno para Python
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validación de datos
- **JWT** - Autenticación
- **Uvicorn** - Servidor ASGI





##  URLs Importantes

- **Frontend (Desarrollo):** http://localhost:3000
- **API (Desarrollo):** http://localhost:8000
- **Documentación API:** http://localhost:8000/docs
- **API Interactiva:** http://localhost:8000/redoc

## Ejecutar Proyecto

### Configuración Inicial

1. **Activar Apache de XAMPP**
   - Abre XAMPP Control Panel
   - Inicia Apache y MySQL

2. **Crear base de datos**
   - Ve a http://localhost/phpmyadmin
   - Crea una base de datos llamada `secondtrade`
   - Asegúrate de que el admin tenga ID = 1 en la tabla usuario

3. **Configurar API**
   ```bash
   cd Api
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```
   - Crea tu propio archivo `.env` en la carpeta Api/

4. **Configurar Frontend**
   ```bash
   cd Front
   npm install
   ```

### Ejecutar en Desarrollo

```powershell
.\start-dev.ps1
```

El script activa el entorno virtual, ejecuta la API y después el Frontend. Presiona Ctrl+C para detener ambos servicios.

