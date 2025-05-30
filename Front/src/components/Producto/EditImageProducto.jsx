import React, { useEffect, useState } from 'react'
import { useImageProducto } from '../hooks/useImageProducto'
import { useEditImageProducto } from '../hooks/useEditImageProducto'
import { useEditProducto } from '../hooks/useEditProducto'
export const EditImageProducto = ({product}) => {
  const {imageProductos} = useImageProducto({product})
  const { ImageEdit , deleteImg , addImg , imgSubida } = useEditImageProducto({imageProductos , product})
 
  return (
   
           <div className="block gap-4  p-4">
<div className="w-full border border-black border-dashed rounded-xl p-4">
<form noValidate>
  <label className="font-bold text-blue-900 hover:text-blue-700">
    Subir foto
    <input
      name="ImgProducto"
      type="file"
      accept="image/*"
      className="hidden"
     
      onChange={addImg}
    />
  </label>
</form>

</div>

<div className="w-full overflow-x-auto">
  <div className="flex gap-4 w-max p-4">
    {[...Array(5)].map((_, index) => (
      <div  key={index} className="relative w-80 h-70 bg-gray-100  overflow-hidden flex items-center justify-center rounded-2xl border border-black flex-shrink-0" >
      {ImageEdit[index]? <img  className='w-full h-full object-cover '  src={`data:image/jpeg;base64,${ImageEdit[index].img}`}  /> 
      :  <svg className='w-20 h-20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='gray'>
    <path d="M160 32c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64l352 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L160 32zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320l-144 0-48 0-80 0c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 344c0 75.1 60.9 136 136 136l320 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-320 0c-48.6 0-88-39.4-88-88l0-224z"/>
  </svg>}

  <svg onClick={() => deleteImg(index)} className='absolute top-2 right-2 w-10  ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
</div>
    ))}
  </div>
</div>


    </div>
  )
}
