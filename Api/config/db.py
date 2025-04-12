from sqlalchemy import create_engine , MetaData

engine = ("mysql+pymysql://root:@localhost:3306/secondtrade")

metaDatos = MetaData()
conexion = engine.connect()