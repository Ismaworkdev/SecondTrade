from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , ForeignKey
from config.db import metaDatos

ProductoFavorito = Table("ProductoFavorito" , metaDatos ,
         Column("IDProducto" , Integer , ForeignKey("Producto.IDProducto") , primary_key=True) ,
         Column("IDUsuario" , Integer ,ForeignKey("Usuario.IDUsario") , primary_key=True) , )