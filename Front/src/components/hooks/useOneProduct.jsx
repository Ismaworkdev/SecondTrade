import  { useState , useEffect ,useContext} from 'react'
import { UserLogeadoContext } from '../Context/UserLogeado';
export const useOneProduct = ({idProducto}) => {
    const [product , setproduct] = useState({})
    const token = sessionStorage.getItem('token');
    const [mg, setmg] = useState(false)
    const [show, setShow] = useState(false);
    const {userLogeado} = useContext(UserLogeadoContext)

            const getOnePrducto = async () => {
         
             if (token) {
                const data = await fetch(`http://127.0.0.1:8000/producto/${idProducto}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }).then((resul)=> resul.json())
                
              setproduct(data)
   
            if (data.IDUsuario == userLogeado.IDUsuario) {
                setShow(true)
                console.log(show)
            }else{
                setShow(false)
                console.log(show)

            }
               
            }
                    
          
        };
        const Postmg =async () => {
            setmg(!mg)
          let DateObj = new Date();

          const fechaHoy = DateObj.toISOString().split('T')[0]; 

          const abjeto = {
           "IDProducto": idProducto,
          };
            
            if (!mg) {
                      const data = await fetch(`http://localhost:8000/productofavorito/`, {
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
                      const data = await fetch(`http://localhost:8000/productofavorito/`, {
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
          const data = await fetch(`http://localhost:8000/productofavorito/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
          }).then((resul)=> resul.json())
          const mg = data.find(item => item.IDProducto == idProducto && item.IDUsuario === userLogeado.IDUsuario);
          if (mg) {
            setmg(true);
          } 

    }
    const deleteProducto = async () => {
        const data = await fetch(`http://localhost:8000/producto/${idProducto}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((resul)=> 
        {
          if(resul.ok){
            console.log("Eliminado correctamente")
          }
        })
      }
 

  
        

   
    
    
        useEffect(() => {
            getOnePrducto();
           getmg()
           
           
        }, [idProducto]);

  return {product , mg , Postmg , show , deleteProducto}
}
