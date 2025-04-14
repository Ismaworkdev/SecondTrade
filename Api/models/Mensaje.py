from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , ForeignKey , Date
from config.db import metaDatos ,engine

Mensaje = Table("Mensaje" , metaDatos ,
         Column("IDMensaje" , Integer , primary_key=True , autoincrement=True) ,
         Column("FechayHora" , Date) , 
         Column("IDUsuario" , Integer , ForeignKey("Usuario.IDUsuario") ) ,
         Column("IDProducto" , Integer , ForeignKey("Producto.IDProducto") ) , 
         Column("Mensaje" , String(250)) )
metaDatos.create_all(engine)