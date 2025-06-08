import { useEffect, useState } from "react";

export const  TaskHecho=({ mensaje })=> {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(true), 2500); 
    const removeTimeout = setTimeout(() => setShow(false), 3000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-2 right-2 flex items-center justify-center  z-50 transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-emerald-400 text-black px-7 py-7 rounded-2xl shadow-xl text-xl font-medium">
        {mensaje}
      </div>
    </div>
  );
}