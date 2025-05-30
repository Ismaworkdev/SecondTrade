# db.py

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, declarative_base

# Cargar variables de entorno
load_dotenv()

# Crear el motor de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

# Crear una sesión local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# MetaData y Base para modelos
metaDatos = MetaData()
Base = declarative_base(metadata=metaDatos)

# Función para obtener una sesión (ideal para FastAPI o reutilización)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
