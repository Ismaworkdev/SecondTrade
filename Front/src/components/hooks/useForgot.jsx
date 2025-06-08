import { useState, React, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TaskHecho } from '../../Pages/TaskHecho';

export const useForgot = () => {
       const navigate = useNavigate();

      const [redirect, setRedirect] = useState(false);


         const [Unauthorized, setUnauthorized] = useState(null);
        const [formDataForgot, setFormDataForgot] = useState({

        Gmail : "" ,
      
    });
    const [errors, setErrors] = useState({
        Gmail : false , 
      
    })

    const [texterrors, settextErrors] = useState({
            Gmail : true , 
          
    })




const handleChangeForgot = (event) => {
    const { name, value } = event.target;

    setFormDataForgot((prev) => ({
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


};

const handleSubmitForgot = (event) => {
    event.preventDefault();
    const { Gmail, Contrasena } = formDataForgot;
   
    
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



    if (!errors.Gmail  && Gmail.trim().length > 0 ) {
        
   
        
    }
}

useEffect(() => {
if (formDataForgot.Gmail.trim().length > 0 ) {
    const istrue = Object.values(texterrors).every((value) => value === true);

  postForgot(istrue)
}
},[texterrors])

 


const postForgot = async (istrue) => {
    const { Gmail } = formDataForgot;
 
       

    if (istrue) {


        const response = await fetch(`http://127.0.0.1:8000/usuario/CambiarContrasena/${Gmail}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
setUnauthorized(true)



 
        }else{
           setUnauthorized(false)
        
        }
}}

;
  
  
    return{
        formDataForgot,
        handleChangeForgot,
        handleSubmitForgot,
        errors,
        texterrors,
        Unauthorized,
        setUnauthorized,
        setFormDataForgot,
        postForgot,
        
    }
}
