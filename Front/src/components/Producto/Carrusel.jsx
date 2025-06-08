import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carrusel = ({ imageProductos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrayImg, setArrayImg] = useState([]);
  const [scale, setScale] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);


  useEffect(() => {
    if (Array.isArray(imageProductos) && imageProductos.length > 0) {
      setArrayImg(imageProductos);
      setCurrentIndex(0);
      setScale(1);
    }
  }, [imageProductos]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? arrayImg.length - 1 : prev - 1));
    setScale(1);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === arrayImg.length - 1 ? 0 : prev + 1));
    setScale(1);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
    setScale(1);
  };

  return (
    <div
      className={`transition-all duration-500 overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center ${
        isFullScreen
          ? "fixed inset-0 z-50 bg-black"
          : "relative w-[800px] h-96 sm:h-[30rem] mx-auto rounded-xl"
      }`}
    >
    
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">


        <div
          onClick={toggleFullScreen}
          className="cursor-pointer w-6 hover:w-8 transition-all"
          title="Pantalla completa"
        >
          {isFullScreen ? (
           
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="black"> <path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>
                  ) : (
                  
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="black"><path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"/></svg>
                  )}
        </div>
      </div>

      {arrayImg.length > 0 ? (
        <>
       
          <img
            src={`data:image/jpeg;base64,${arrayImg[currentIndex].img}`}
            alt={`Imagen ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: `scale(${scale})` }}
          />

          
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            <ChevronLeft size={24} />
          </button>

          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            <ChevronRight size={24} />
          </button>

       
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {arrayImg.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-lg">Cargando imágenes...</p>
      )}
    </div>
  );
};
