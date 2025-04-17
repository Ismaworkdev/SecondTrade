from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , Date , ForeignKey
from config.db import metaDatos , engine

Conversacion = Table("Conversacion" , metaDatos ,
         Column("IDConversacion" , Integer , primary_key=True , autoincrement=True) ,
         Column("IDUsuario" , Integer , ForeignKey("Usuario.IDUsuario")) ,
         Column("IDProducto" , Integer ,ForeignKey("Producto.IDProducto")  ) ,
         Column("Fecha_inicio" , Date))
metaDatos.create_all(engine)