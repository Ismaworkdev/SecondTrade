from sqlalchemy import  Table , Column, Integer, String, LargeBinary , Date
from config.db import metaDatos , engine 


Usuario = Table("Usuario" , metaDatos ,
         Column("IDUsuario" , Integer , primary_key=True , autoincrement=True) ,
         Column("Nombre" , String(250)) , 
         Column("Apellidos" , String(250)) , 
         Column("Gmail" , String(250), unique=True) , 
         Column("Contrasena" , String(250)) , 
         Column("Telefono" , String(250)) , 
         Column("Calle" , String(250)) ,
         Column("Ciudad_Pueblo" , String(250)) ,
         Column("Provincia" , String(250)) ,
          Column("Region" , String(250)) ,
          Column("Codigo_postal" , String(250)), 
         Column("Fecha_nacimiento" , Date) ,
          Column("ImgPerfil" ,LargeBinary, nullable=True)  )

metaDatos.create_all(engine)