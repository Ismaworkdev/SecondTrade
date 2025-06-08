import React , {useEffect , useState} from 'react'
import logo from '../../assets/logo.png'
import { Nav } from "./Nav"
import { Link } from 'react-router-dom'
export const Header = () => {
    const [up , setup] = useState(!window.scrollY)
    const [Desplegado, setDesplegado] = useState(false);
    let handleClick =()=>{
        setDesplegado(!Desplegado)
    }
   

  return (

   <nav className={`fixed right-0 top-0 w-full z-20 transition duration-500 ease-in-out mb-7 ${up && 'bg-white shadow-lg' }`}>
    <div className="flex  justify-between items-center " >
       <Link to="/home" className='flex flex-row justify-center md:px-12 md:mx-12 items-center text-center font-semibold'>
        <img src={logo} alt="Logo" className='w-[100px]' />
       
       </Link>
       <div className="group flex flex-col items-center ">
        <button className='p-2 rounded-lg lg:hidden text-blue-900' onClick={handleClick}>
            <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {Desplegado && (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                )}
                {!Desplegado && (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
            </svg>
        </button>
        <div className="hidden lg:flex lg:items-center lg:space-x-4 pr-10">
            <Nav />
        </div>

        <div className={`fixed transition-transform duration-300 ease-in-out transit flex justify-center left-0 w-full h-auto rounded-md p-24 bg-white lg:hidden shadow-xl top-25 ${  Desplegado ? "block" : "hidden" } `}>
            <div className='flex flex-col space-y-6'>
                <Nav/>
            </div>                                                
        </div>
       </div>


    </div>
   </nav>
  )
}
