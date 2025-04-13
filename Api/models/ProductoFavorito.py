from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , ForeignKey
from config.db import metaDatos , engine


ProductoFavorito = Table("ProductoFavorito" , metaDatos ,
         Column("IDProducto" , Integer , ForeignKey("Producto.IDProducto") , primary_key=True) ,
         Column("IDUsuario" , Integer ,ForeignKey("Usuario.IDUsuario") , primary_key=True) , )

metaDatos.create_all(engine)