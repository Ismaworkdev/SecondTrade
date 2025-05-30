import { Link } from "react-router-dom";
import { useImageProducto } from "../hooks/useImageProducto"

export const MiniProducto = ({producto}) => {
      const { imageProductos } = useImageProducto({product : producto });

  return (

         <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
            <Link to={`/home/producto/${producto.IDProducto}`}>
            <div className="m-1   text-sm">
            <img alt="card img" className="h-70 w-full object-cover rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out " src={
            imageProductos.length > 0
              ? `data:image/jpeg;base64,${imageProductos[0].img}`
              : "placeholder.jpg"
          } />
                <h2 className="font-semibold my-4 text-2xl text-start">{producto.Titulo}</h2>
                <p className="font-semibold my-4 text-2xl text-start">{producto.Precio}€</p>
            </div>
           </Link>
        </div>

    
  )
}
