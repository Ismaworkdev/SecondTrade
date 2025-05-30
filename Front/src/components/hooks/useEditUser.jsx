import { useState, React, useEffect, useContext } from 'react';
import { Navigate, useNavigate  , Link  } from "react-router-dom";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import defaultUser from '../../assets/default_user.jpg';
import { UserLogeadoContext } from '../Context/UserLogeado';
import { useLogout } from './useLogout';


export const useEditUser = () => {
     const { logout } = useLogout();
    const {userLogeado} = useContext(UserLogeadoContext)
    let token  = sessionStorage.getItem("token");
    console.log(userLogeado)
    
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
    ConfirmarContrasena : userLogeado.Contrasena ,
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
        ConfirmarContrasena : false ,
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
        ConfirmarContrasena : true ,
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
        
        const { name, value , files } = event.target;
        setformDataEdit((prev)=> ({
            ...prev,
           [name]: name === 'ImgPerfil' ? files[0] : value
        }));

        if (name === "Gmail") {
          
         if (value && /^[a-zA-Z0-9._%+-]+@gmail\.(com|es)$/.test(value.trim())) {
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
     if (name === "ConfirmarContrasena") {
        if (value && value.length >= 8 && /[0-9]/.test(value)) {
            setErrors((prev) => ({
                ...prev,
                ConfirmarContrasena: false,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                ConfirmarContrasena: true,
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
    
    const {Nombre,Apellidos, Gmail ,  Contrasena ,  ConfirmarContrasena ,Telefono  ,Calle ,  CiudadPueblo ,Provincia ,Fecha_Nacimiento , ImgPerfil  } = formDataEdit;
    let existe = await isregistered(Gmail)
    console.log(existe)
    
   
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

if(errors.ConfirmarContrasena  ||    ConfirmarContrasena.trim().length == 0  ){
   settextErrors((prev) => ({
        ...prev,
        ConfirmarContrasena: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    ConfirmarContrasena: true,
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

    if( ConfirmarContrasena != Contrasena && ConfirmarContrasena.trim().length < 5 ){

      settextErrors((prev) => ({
        ...prev,
        compatible: false,
    }));
    }else{
   settextErrors((prev) => ({
    ...prev,
    compatible: true,
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
    const {Nombre,Apellidos, Gmail ,  Contrasena ,  ConfirmarContrasena ,Telefono   ,Fecha_Nacimiento , ImgPerfil  } = formDataEdit;
    const {Calle , CiudadPueblo , Provincia , Pais} = address

    if (istrue) {
        const toBase64FromUrl = (url) => 
        fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
            }));

        const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        });

     
        // Si ImgPerfil está vacío, convierte la URL defaultUser
        // Si no, convierte el archivo ImgPerfil
        const base64Img = ImgPerfil == null 
            ? userLogeado.ImgPerfil 
            : await toBase64(ImgPerfil);           
    try {
        console.log("iiiiiiiiiii",base64Img)
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
                console.log(abjeto)

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
                if (Gmail !== userLogeado.Gmail) {
                    logout();
                    
                }
                }else {
                    console.log(response)
                console.log('Error en el registro');
                }


                })
        
      } catch (error) {
                
        
      }


                }
}
           
        useEffect(() => {
          const istrue = Object.values(texterrors).every(value => value === true);
          
          console.log(texterrors)
           
          if (istrue ) {
           
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
    putEdit

     


};
}
