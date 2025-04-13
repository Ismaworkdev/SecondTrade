from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double  , ForeignKey
from config.db import metaDatos , engine

ImagenProducto = Table("ImagenProducto" , metaDatos ,
         Column("IDImagen" , Integer , primary_key=True) ,
         Column("img" , LargeBinary ) ,
         Column("IDProducto" , Integer , ForeignKey("Producto.IDProducto") ) )
metaDatos.create_all(engine)