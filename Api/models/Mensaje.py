from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , ForeignKey , Date
from config.db import metaDatos

Producto = Table("Mensaje" , metaDatos ,
         Column("IDMensaje" , Integer , primary_key=True) ,
         Column("IDConversacion" , Integer  , ForeignKey("Conversacion.IDConversacion") ) ,
         Column("FechayHora" , Date) , 
         Column("IDUsuario" , String(250)) , 
         Column("Mensaje" , String(250)) )