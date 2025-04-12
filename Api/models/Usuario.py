from sqlalchemy import  Table , Column, Integer, String, LargeBinary
from config.db import metaDatos

Usuario = Table("Usuario" , metaDatos ,
         Column("IDUsuario" , Integer , primary_key=True) ,
         Column("Nombre" , String(250)) , 
         Column("Apellidos" , String(250)) , 
         Column("Gmail" , String(250)) , 
         Column("Password" , String(250)) , 
         Column("Telefono" , String(250)) , 
         Column("Calle" , String(250)) ,
         Column("Ciudad/Pueblo" , String(250)) ,
         Column("Provincia" , String(250)) ,
          Column("Region_Militar" , String(250)) ,
          Column("Codigo_postal" , String(250)), 
         Column("Fecha_nacimiento" , String(250)) ,
          Column("ImgPerfil" ,LargeBinary, nullable=True)  )