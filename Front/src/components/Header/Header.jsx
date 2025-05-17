import React , {useEffect , useState} from 'react'
import logo from '../../assets/logo.png'
import { Nav } from "./Nav"
export const Header = () => {
    const [up , setup] = useState(!window.scrollY)
    const [Desplegado, setDesplegado] = useState(false);
    let handleClick =()=>{
        setDesplegado(!Desplegado)
    }

  return (
   <nav className={`fixed top-0 w-full z-20 transition duration-500 ease-in-out mb-16 ${!up && 'bg-white shadow-lg' }`}>
    <div className='flex flex-row justify-between items-center py-2" '>
       <div className='flex flex-row justify-center md:px-12 md:mx-12 items-center text-center font-semibold'>
        <img src={logo} alt="Logo" className='w-10 h-10 mr-2' />
       
       </div>
       <div className="group flex flex-col items-center">
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
        <div className='hidden space-x-6 lg:inline-block p-5'>
            <Nav />
        </div>

        <div className={`fixed transition-transform duration-300 ease-in-out transit flex justify-center left-0 w-full h-auto rounded-md p-24 bg-white lg:hidden shadow-xl top-14 ${  Desplegado ? "block" : "hidden" } `}>
            <div className='flex flex-col space-y-6'>
                <Nav/>
            </div>                                                
        </div>
       </div>


    </div>
   </nav>
  )
}
