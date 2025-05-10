from sqlalchemy import create_engine , MetaData
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv , dotenv_values
load_dotenv()
engine = create_engine(os.getenv("DATABASE_URL"))

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

metaDatos = MetaData()
conexion = engine.connect()