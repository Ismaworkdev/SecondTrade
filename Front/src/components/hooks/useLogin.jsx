import { useState, React, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  {UserLogeadoContext} from '../Context/UserLogeado'

export const useLogin = () => {
      const navigate = useNavigate();
       const [showPassword, setShowPassword] = useState(false);
    const { userLogeado, setUserLogeado } = useContext(UserLogeadoContext);
      const [redirect, setRedirect] = useState(false);


         const [Unauthorized, setUnauthorized] = useState(true);
        const [formDataLogin, setFormDataLogin] = useState({

        Gmail : "" ,
        Contrasena : "" ,
    });
    const [errors, setErrors] = useState({
        Gmail : false , 
        Contrasena : false ,
    })

    const [texterrors, settextErrors] = useState({
            Gmail : true , 
            Contrasena : true ,
    })




const handleChangeLogin = (event) => {
    const { name, value } = event.target;

    setFormDataLogin((prev) => ({
        ...prev,
        [name]: value,
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
};

const handleSubmitLogin = (event) => {
    event.preventDefault();
    const { Gmail, Contrasena } = formDataLogin;
   
    
    if (errors.Gmail || Gmail.trim().length ==0) {
  
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

    if (errors.Contrasena  || Contrasena.trim().length === 0 ) {
   settextErrors((prev) => ({
    ...prev,
    Contrasena: false ,
}));
    }else{  
   settextErrors((prev) => ({
    ...prev,
    Contrasena: true ,
}));
    }

    if (!errors.Gmail && !errors.Contrasena && Gmail.trim().length > 0 && Contrasena.trim().length > 0) {
        
   
        
    }
}

useEffect(() => {
if (formDataLogin.Gmail.trim().length > 0 && formDataLogin.Contrasena.trim().length > 0) {
    const istrue = Object.values(texterrors).every((value) => value === true);

  postlogin(istrue)
}
},[texterrors])

    let getinfologed = async (gmail)=>{
       let data = await fetch(`http://127.0.0.1:8000/usuario/Gmail/${gmail}/`)
         .then((resul)=> resul.json())
         return data
    }


const postlogin = async (istrue) => {
    const { Gmail, Contrasena } = formDataLogin;
   
        const form = new URLSearchParams();
        form.append("username", Gmail);
        form.append("password", Contrasena);

    if (istrue) {


        const response = await fetch('http://127.0.0.1:8000/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: form.toString(),
        });

        if (response.ok) {
            setUnauthorized(true)
                    const data = await response.json();
        
       
        sessionStorage.setItem('token', data.access_token);
        let infouser = await getinfologed(Gmail)
        setUserLogeado(infouser)
        if (data.access_token) {
            redirigir()
    }
        }else{
           setUnauthorized(false)
        }
}}
const redirigir = () => {
  navigate("/home", { replace: true });
  
}
;
  
  
    return{
        formDataLogin,
        handleChangeLogin,
        handleSubmitLogin,
        errors,
        texterrors,
        Unauthorized,
        setUnauthorized,
        setFormDataLogin,
        postlogin,
        redirigir , showPassword, setShowPassword
    }
}
