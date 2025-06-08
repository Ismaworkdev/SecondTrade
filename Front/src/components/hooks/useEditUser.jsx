import { useState, React, useEffect, useContext } from 'react';
import { Navigate, useNavigate  , Link  } from "react-router-dom";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import defaultUser from '../../assets/default_user.jpg';
import { UserLogeadoContext } from '../Context/UserLogeado';
import { useLogout } from './useLogout';


export const useEditUser = () => {
        let defaul  = "data:image/png;base64,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"
 const [showPassword, setShowPassword] = useState(false);
     const { logout } = useLogout();
     const [done , setdone] = useState(false)
    const {userLogeado ,getinfouser} = useContext(UserLogeadoContext)
    let token  = sessionStorage.getItem("token");
    
    
    const [write, setwrite] = useState(false);
    const [ Gmailexiste , setGmailexiste ] = useState({});
    const [address, seaddress] = useState({
        Calle: userLogeado.Calle,
        CiudadPueblo: userLogeado.Ciudad_Pueblo,
        Provincia: userLogeado.Region,
        Pais: "",
    });
    const [formDataEdit, setformDataEdit] = useState({
    Nombre: userLogeado.Nombre,
    Apellidos: userLogeado.Apellidos, 
    Gmail : userLogeado.Gmail ,
    Contrasena : userLogeado.Contrasena ,
    
    Telefono : userLogeado.Telefono ,
    Calle : userLogeado.Calle ,
    CiudadPueblo : userLogeado.Ciudad_Pueblo ,   
    Provincia : userLogeado.Provincia,
    
    Fecha_Nacimiento : userLogeado.Fecha_nacimiento ,
    ImgPerfil : "" ,

});

        const [errors, setErrors] = useState({
        Nombre: false,
        Apellidos: false,

        Gmail : false ,
        Contrasena : false ,
       
        Telefono : false ,
      
        CiudadPueblo : false ,   
        Provincia : false,
         compatible : false , 
        Fecha_Nacimiento : false ,
        ImgPerfil : false ,
        })
        const [texterrors, settextErrors] = useState({
        Nombre: true,
        Apellidos: true,
        Gmail : true ,
        Contrasena : true ,
      
        Telefono : true ,
        existe : true ,
        CiudadPueblo : true ,   
        Provincia : true,
        compatible : true , 
        Fecha_Nacimiento : true,
        ImgPerfil : true,
        })
        
        const [position, setPosition] = useState(null);

    
        const handleChangeEdit = (event) => {
        setwrite(true)
        const { name, value , files } = event.target;
        setformDataEdit((prev)=> ({
            ...prev,
           [name]: name === 'ImgPerfil' ? files[0] : value
        }));

        if (name === "Gmail") {
          
         if (value && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es)$/.test(value.trim())) {
           setErrors((prev) => ({
                ...prev,
                 Gmail: false,
            }));
        } else {
                setErrors((prev) => ({
                ...prev,
                 Gmail: true,
            }));
           
        }
    }
        if (name === "Contrasena") {
        if (value && value.length >= 8 && /[0-9]/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                Contrasena: false,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                Contrasena: true,
            }));
        }
    }

    if (name === "Telefono") {
        if (value && value.length >= 9 && /^[0-9]+$/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                Telefono: false,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                Telefono: true,
            }));
        }
    }

    if (name === "Fecha_Nacimiento") {
        const fecha = new Date(value);
        const fechaActual = new Date();
        const edad = fechaActual.getFullYear() - fecha.getFullYear();
       

        if (edad > 18 ) {
            setErrors((prev) => ({
                ...prev,
                Fecha_Nacimiento: false,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                Fecha_Nacimiento: true,
            }));
        }
    }

  

     
    };
        let isregistered= async (gmail)=>{
       let data = await fetch(`http://127.0.0.1:8000/usuario/Gmail/${gmail}/`)
         .then((resul)=> resul.json())
         return data
    }
     const handleSubmitEdit = async (event) => {
    event.preventDefault();
    
    const {Nombre,Apellidos, Gmail ,  Contrasena  ,Telefono  ,Calle ,  CiudadPueblo ,Provincia ,Fecha_Nacimiento , ImgPerfil  } = formDataEdit;
    let existe = await isregistered(Gmail)
    
    
   
    if (existe.Gmail && existe.Gmail !== userLogeado.Gmail) {
        settextErrors((prev) => ({
            ...prev,
            existe: false,
        }));
    } else {
        settextErrors((prev) => ({
            ...prev,
            existe: true,
        }));
    }
    if(errors.Nombre  ||    Nombre.trim().length == 0 ){
   settextErrors((prev) => ({
        ...prev,
        Nombre: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    Nombre: true,
}));
    }
        if(errors.Apellidos  ||    Apellidos.trim().length == 0 ){
   settextErrors((prev) => ({
        ...prev,
        Apellidos: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    Apellidos: true,
}));
    }

            if(errors.Contrasena  ||    Apellidos.trim().length == 0 ){
   settextErrors((prev) => ({
        ...prev,
        Contrasena: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    Contrasena: true,
}));
    }


    
if(errors.Gmail  ||    Gmail.trim().length == 0  ){
   settextErrors((prev) => ({
        ...prev,
        Gmail: false,
    }));
    }else{
    
   settextErrors((prev) => ({
    ...prev,
    Gmail: true,
}));
    }


    if(errors.Telefono  ||    Telefono.trim().length == 0 ){
   settextErrors((prev) => ({
        ...prev,
        Telefono: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    Telefono: true,
}));
    }

        if(errors.CiudadPueblo  ||    address.CiudadPueblo.trim().length == 0 ){
   settextErrors((prev) => ({
        ...prev,
        CiudadPueblo: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    CiudadPueblo: true,
}));
    }

    
if(errors.Provincia  ||    address.Provincia.trim().length == 0 ){
   settextErrors((prev) => ({
        ...prev,
        Provincia: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    Provincia: true,
}));
    }

    if(errors.Fecha_Nacimiento  ||    Fecha_Nacimiento.trim().length == 0 ){
   settextErrors((prev) => ({
        ...prev,
        Fecha_Nacimiento: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    Fecha_Nacimiento: true,
}));
    }



    }
            const getAdress = async ()=>{
                  
            const data = await fetch(`http://127.0.0.1:8000/Coordenadas/${position.lat}/${position.lng}/`)
            .then((resul)=> resul.json())
            let addres = data.message
            if (data.status == "success") {
                setwrite(true)
                
            }
        
            seaddress({
                Calle : addres.calle ,
                CiudadPueblo : addres.ciudad , 
                Provincia : addres.provincia ,
                Pais : addres.pais

            })



           
        }   



    const putEdit = async (istrue)=>{
       
    const {Nombre,Apellidos, Gmail ,  Contrasena  ,Telefono   ,Fecha_Nacimiento , ImgPerfil  } = formDataEdit;
    const {Calle , CiudadPueblo , Provincia , Pais} = address

    if (istrue) {


        const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        });

        try {
           
     
        const base64Img = !ImgPerfil  
            ? userLogeado.ImgPerfil
            : await toBase64(ImgPerfil);         
   
    
          const abjeto = {
                Nombre: Nombre,
                Apellidos: Apellidos,
                Gmail: Gmail,
                Contrasena: Contrasena,
                Telefono: Telefono,
                Calle: Calle,
                Ciudad_Pueblo: CiudadPueblo,
                Provincia: Provincia,
                Region: Provincia, 
                Codigo_postal: "string", 
                Fecha_nacimiento: Fecha_Nacimiento,
                ImgPerfil: base64Img, 
                };
               

                fetch('http://127.0.0.1:8000/usuario/', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify(abjeto),
                }).then((response) => {
                if (response.ok) {
                    setdone(true)
                if (Gmail !== userLogeado.Gmail) {
                    logout();
                    
                }
                getinfouser()
                }else {
                   
                }


                })
        
      } catch (error) {
                
        
      }


                }
}
           
        useEffect(() => {
          const istrue = Object.values(texterrors).every(value => value === true);
          
         
           
          if (istrue  && write ) {
           setdone(false)
            putEdit(istrue)
             
            }
        }, [texterrors]);

    

    
  return {
    formDataEdit,
    setformDataEdit ,
    handleChangeEdit ,
    handleSubmitEdit ,
    texterrors,
    settextErrors, 
    write ,
    setPosition,
    position,
address, 
seaddress , 
getAdress , 
errors, setErrors , 
isregistered ,
    putEdit , done ,
showPassword, setShowPassword
     


};
}
