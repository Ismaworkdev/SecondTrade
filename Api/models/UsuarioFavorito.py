from sqlalchemy import  Table , Column, Integer, String, LargeBinary, Double , ForeignKey
from config.db import metaDatos  , engine

UsuarioFavorito = Table("UsuarioFavorito" , metaDatos ,
         Column("IDUsuarioGustado" , Integer , ForeignKey("Usuario.IDUsuario"),primary_key=True) ,
         Column("IDUsuario" , Integer , ForeignKey("Usuario.IDUsuario"),  primary_key=True) , )

metaDatos.create_all(engine)