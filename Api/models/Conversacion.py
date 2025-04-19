from sqlalchemy import Table, Column, Integer, ForeignKey
from config.db import metaDatos, engine

Conversacion = Table("Conversacion", metaDatos,
    Column("IDConversacion", Integer, primary_key=True, autoincrement=True),
    Column("IDUsuarioComprador", Integer, ForeignKey("Usuario.IDUsuario")),
    Column("IDUsuarioVendedor", Integer, ForeignKey("Usuario.IDUsuario")),
    Column("IDProducto", Integer, ForeignKey("Producto.IDProducto")),
)

metaDatos.create_all(engine)
