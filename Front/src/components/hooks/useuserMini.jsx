import {useEffect, useState , useContext} from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado';
export const useuserMini = ({idU}) => {
    let token = sessionStorage.getItem('token');
    const [User, setUser] = useState({});
      const [mg , setmg] = useState(false)
       const {userLogeado} = useContext(UserLogeadoContext)
    const getUser = async () => {

        const data = await fetch(`http://127.0.0.1:8000/usuario/UserProfile/${idU}`)
        .then((res) => res.json())
       console.log("data", data)
       setUser(data);
       

    }
    console.log(User)
const Postmg =async () => {
  setmg(!mg)
let DateObj = new Date();

const fechaHoy = DateObj.toISOString().split('T')[0]; 

const abjeto = {
  "IDUsuarioGustado": idU,
  "Fecha_agregado": fechaHoy
};
  
  if (!mg) {
           let  data = await  fetch(`http://localhost:8000/usuarioFavorito/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }, body: JSON.stringify(abjeto),
          }).then((resul)=> {
            if(resul.ok){
                console.log("posteado correctamente")
            }
          })
    
  }else{
            let  data1 = await fetch(`http://localhost:8000/usuarioFavorito/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }, body: JSON.stringify(abjeto),
          }).then((resul)=> {
            if(resul.ok){
                console.log("Elimiminado correctamente")
            }
          })
  }
}
const getmg = async () => {
          const data = await fetch(`http://localhost:8000/usuarioFavorito/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then((resul)=> resul.json())
      const mg = data.find(item => item.IDUsuarioGustado == idU && item.IDUsuario == userLogeado.IDUsuario);
   
      if (mg) {
        setmg(true);
      } 

}
    useEffect(() => {   
        getUser();
        console.log("useUserMini", User , idU)
        getmg();
    }, [idU]);

  return {User , mg , Postmg}
}
