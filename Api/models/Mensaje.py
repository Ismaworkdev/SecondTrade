from sqlalchemy import Table, Column, Integer, String, ForeignKey, Date
from config.db import metaDatos, engine

Mensaje = Table("Mensaje", metaDatos,
    Column("IDMensaje", Integer, primary_key=True, autoincrement=True),
    Column("FechayHora", Date),
    Column("IDUsuario", Integer, ForeignKey("Usuario.IDUsuario")),  # Remitente
    Column("IDConversacion", Integer, ForeignKey("Conversacion.IDConversacion")),
    Column("Mensaje", String(250))
)

metaDatos.create_all(engine)
