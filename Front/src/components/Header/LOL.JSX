import { useState, React, useEffect, use } from 'react';
import { Navigate, useNavigate  , Link  } from "react-router-dom";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export const Register = () => {

          const [position, setPosition] = useState(null);
          let write = false
          const [address, seaddress] = useState({
            Calle: "",
            CiudadPueblo: "",
            Provincia: "",
            Pais: "",
          });
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
        
        const  LocationMarker = ()=> {
          useMapEvents({
            click(event) {
              const coords = event.latlng;
              setPosition(coords);
              
            }
          });
        
          return position === null ? null : (
            <Marker position={position}>
            </Marker>
          );
        }
        const getAdress = async ()=>{
            const data = await fetch(`http://127.0.0.1:8000/Coordenadas/${position.lat}/${position.lng}/`)
            .then((resul)=> resul.json())
            let addres = data.message
        
            seaddress({
                Calle : addres.calle ,
                CiudadPueblo : addres.ciudad , 
                Provincia : addres.provincia ,
                Pais : addres.pais

            })



           
        }   

        useEffect(() => {
            
            getAdress()
           
           
        }, [position]);
        
       
        const [formDataRegister, setFormDataRegister] = useState({
        Nombre: "",
        Apellidos: "", 
        Gmail : "" ,
        Contrasena : "" ,
        ConfirmarContrasena : "" ,
        Telefono : "" ,
        Calle : "" ,
        CiudadPueblo : "" ,   
        Provincia : "" ,
      
        Fecha_Nacimiento : "" ,
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



        const handleChangeRegister = (event) => {
             write = true
        const { name, value } = event.target;
        setFormDataRegister((prev)=> ({
            ...prev,
            [name]: value,
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
    
    const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const {Nombre,Apellidos, Gmail ,  Contrasena ,  ConfirmarContrasena ,Telefono  ,Calle ,  CiudadPueblo ,Provincia ,Fecha_Nacimiento , ImgPerfil  } = formDataRegister;
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

    
if(errors.Gmail  ||    Gmail.trim().length == 0 ){
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
    let existe = await isregistered(Gmail)
   
        if(existe.Gmail == Gmail){
            settextErrors((prev) => ({
                ...prev,
                existe: false,
            }));
        }else{
            settextErrors((prev) => ({
                ...prev,
                existe: true,
            }));
        }
    



    }
useEffect(() => {
  const istrue = Object.values(texterrors).every(value => value === true);

  if (istrue && write) {
    postRegister(istrue)
    }
}, [texterrors]);


const postRegister = async (istrue)=>{
        const {Nombre,Apellidos, Gmail ,  Contrasena ,  ConfirmarContrasena ,Telefono   ,Fecha_Nacimiento , ImgPerfil  } = formDataRegister;
        const {Calle , CiudadPueblo , Provincia , Pais} = address

    if (istrue) {
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
  ImgPerfil: ImgPerfil, 
};

fetch('http://127.0.0.1:8000/usuario/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify(abjeto),
})
  .then(response => {
    
   
  })

        
    }

}
    


;


   
  return (

<div className="flex justify-center items-center mt-8 w-full  py-12 lg:py-24">
  <div className="w-full max-w-7xl mx-auto my-8 px-4 lg:px-8" data-aos="zoom-in">
    <form noValidate onSubmit={handleSubmitRegister}>
      <div className="w-full bg-white p-8 my-4 md:px-12 lg:px-20 rounded-2xl shadow-2xl">
        <div className="flex mb-6">
          <h1 className="font-bold text-center lg:text-left text-blue-900 text-4xl w-full">
            Registrarse en SecondTrade
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5 w-full">
          <div className="w-full h-[400px] md:h-[500px]">
            <MapContainer
              center={[39.88576693369136, -4.456524558827891]}
              zoom={13}
              className="w-full h-full  z-0"
              attributionControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
                     
            </div>
                         

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <input 
                                        name="Nombre" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Nombre ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Nombre*" 
                                        value={formDataRegister.Nombre}
                                        onChange={handleChangeRegister}
                                        //onKeyUp={clearErrors}
                                    />
                                  
                                         <p className="text-red-500 text-sm">{!texterrors.Nombre ? 'Nombre invalido ' : ''}</p>
                                    
                                </div>
                                
                                <div>
                                    <input 
                                        name="Apellidos" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Apellidos ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Apellidos*"
                                        value={formDataRegister.Apellidos}
                                        onChange={ handleChangeRegister}
                                     
                                    />
                                   
                                       <p className="text-red-500 text-sm">{!texterrors.Apellidos ? 'Apellidos invalido ' : ''}</p>
                                    
                                </div>
                                <div>
                                    <input 
                                        name="Contrasena" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Contrasena ? `border-4 border-red-400` : ``}`}
                                        type="password" 
                                        placeholder="Contraseña*"
                                        value={formDataRegister.Contrasena}
                                        onChange={ handleChangeRegister}
                                        //onKeyUp={clearErrors}
                                    />
                                    
                                       <p className="text-red-500 text-sm">{!texterrors.Contrasena ? 'Contraseña invalido ' : ''}</p>
                                    
                                </div>
                                <div>
                                    <input 
                                        name="ConfirmarContrasena" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.ConfirmarContrasena ? `border-4 border-red-400` : ``}`}
                                        type="password" 
                                        placeholder="Confirmar Contraseña*"
                                        value={formDataRegister.ConfirmarContrasena}
                                        onChange={ handleChangeRegister}
                                        //onKeyUp={clearErrors}
                                    />
                                    
                                        <p className="text-red-500 text-sm">{!texterrors.ConfirmarContrasena ? 'Confirmar Contraseña invalido ' : ''}</p>
                                    
                                </div>

                                <div>
                                    <input 
                                        name="Gmail"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Gmail ? `border-4 border-red-400` : ``}`}
                                        type="email" 
                                        placeholder="Gmail*"
                                        value={formDataRegister.Gmail}
                                        onChange={ handleChangeRegister}
                                        
                                    />
                                   
                                <p className="text-red-500 text-sm">{!texterrors.Gmail ? 'Gmail invalido ' : ''}</p>

                                    
                                </div>

                                
                                <div>
                                    <input 
                                        name="Telefono"
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Telefono ? `border-4 border-red-400` : ``}`}
                                        type="number" 
                                        placeholder="Telefono*"
                                        value={formDataRegister.Telefono}
                                        onChange={ handleChangeRegister}
                                        
                                    />
                                   
                                     <p className="text-red-500 text-sm">{!texterrors.Telefono ? 'Telefono invalido ' : ''}</p>

                                    
                                </div>

                                <div>
                                    <input
                                        name="CiudadPueblo" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.CiudadPueblo ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Ciudad / Pueblo*"
                                        value={address.CiudadPueblo}
                                        onChange={ handleChangeRegister}
                                       
                                        
                                    />
                                      <p className="text-red-500 text-sm">{!texterrors.CiudadPueblo ? 'Ciudad / Pueblo  invalidos selecionalo en el mapa  ' : ''}</p>

                                    
                                </div>
                                 <div>
                                    <input
                                        name="Provincia" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Provincia ? `border-4 border-red-400` : ``}`}
                                        type="text" 
                                        placeholder="Region*"
                                        value={address.Provincia}
                                        onChange={ handleChangeRegister}
                                       
                                        
                                    />
                                    
                                     <p className="text-red-500 text-sm">{!texterrors.Provincia ? 'Region  invalida selecionalo en el mapa  ' : ''}</p>

                                    
                                </div>


                                 <div>
                                    <input
                                        name="Fecha_Nacimiento" 
                                        className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.Fecha_Nacimiento ? `border-4 border-red-400` : ``}`}
                                        type="Date" 
                                        placeholder="Fecha Nacimiento*"
                                        value={formDataRegister.Fecha_Nacimiento}
                                        onChange={ handleChangeRegister}
                                       
                                        
                                    />
                                    
                                      <p className="text-red-500 text-sm">{!texterrors.Fecha_Nacimiento ? 'Fecha  invalido ' : ''}</p>

                                    
                                </div>
                                <div>
                                    <input
                                        name="ImgPerfil"
                                        className={`w-full  bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${errors.ImgPerfil ? `border-4 border-red-400` : ``}`}
                                        type="file"
                                        accept="image/*" 
                                        placeholder="Imagen de Perfil*"
                                        value={formDataRegister.ImgPerfil}
                                        onChange={ handleChangeRegister}

                                       
                                        
                                    />
                                    
                                    <p className="text-red-500 text-sm">{!texterrors.ImgPerfil ? 'Imagen de Perfil  invalido ' : ''}</p>

                                    
                                </div>

                        </div>
                    </div>

                        <div className="my-2 ">
                        <p className="text-red-500 text-sm">{!texterrors.compatible ? 'Vuelve a escribir la contraseña' : ''}</p>
                            <button type="submit"  className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Registrarse 
                            </button>
                             <p className="text-red-500 text-sm">{!texterrors.existe ? 'Este Gmail ya esta Registrado ' : ''}</p>
                            <p className="text-sm text-center mt-4">
                                Ya tienes cuenta? 
                                <Link to="/login" className="font-bold text-blue-900 hover:text-blue-700"> Inicia Sesion</Link>
                            </p>
                        </div>
                    </div>
                    </form>
                    <div className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto lg:ml-[1100px] bg-blue-900 rounded-2xl">
                        <div className="flex flex-col text-white">     
                            <div className="flex my-4 w-2/3 lg:w-3/4">
                                <div className="flex flex-col">
                                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Oficinas Centrales </h2>
                                    <p className="text-gray-400">Carpio de tajo , Toledo </p>
                                </div>
                            </div>
                            
                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                <i className="fas fa-phone-alt pt-2 pr-2" />
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="text-2xl"> Numero de Soporte </h2>
                                    <p className="text-gray-400">Tel: 666999555</p>
                                
                                    <div className='mt-5'>
                                        <h2 className="text-2xl">Gmail de Soporte </h2>
                                        <a href="mailto:secondtradeapp@gmail.com" className="text-gray-400">secondtradeapp@gmail.com</a>
                                    </div>
                            
                                </div>
                            </div>
                            
                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8 mx-1 text-center pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8 mx-1 text-center pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
             
            </div>
  )
}
