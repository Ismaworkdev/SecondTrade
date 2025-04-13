from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , Date , ForeignKey
from config.db import metaDatos , engine

Conversacion = Table("Conversacion" , metaDatos ,
         Column("IDUsuario" , Integer  ,ForeignKey("Usuario.IDUsuario") , primary_key=True ) ,
          Column("IDProducto" , Integer ,ForeignKey("Producto.IDProducto")  , primary_key=True) ,
         Column("Fecha_inicio" , Date))
metaDatos.create_all(engine)