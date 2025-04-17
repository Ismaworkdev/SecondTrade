from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , ForeignKey
from config.db import metaDatos , engine

Producto = Table("Producto" , metaDatos ,
         Column("IDProducto" , Integer , primary_key=True , autoincrement=True) ,
         Column("Precio" , Double ) ,
         Column("Titulo" , String(250)) , 
         Column("Descripcion" , String(250)) , 
         Column("Estado" , String(250)) , 
         Column("Fecha_hora_subida" , String(250)) , 
         Column("Categoria" , String(250)) , 
         Column("IDUsuario" , Integer , ForeignKey("Usuario.IDUsuario")) )
metaDatos.create_all(engine)