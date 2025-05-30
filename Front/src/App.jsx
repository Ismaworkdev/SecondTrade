import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { Register } from './components/Login&Register/Register';
import { Login } from './components/Login&Register/Login';
import { RedirectByAuth } from './components/routes/RedirectByAuth';
import { RequireAuth } from './components/routes/RequireAuth';
import { UserLogeadoContext, UserLogeado } from './components/Context/UserLogeado';
import { Contenedor } from './components/Contenedor';
import {User} from './components/Tu/User';
import { Vender } from './components/Vender/Vender';
import { Favoritos } from './components/Favorito/Favoritos';
import {Buzon} from './components/Buzon/Buzon';
import { Producto } from './components/Producto/Producto';
import { EditUser } from './components/Tu/EditUser';
import { EditProducto } from './components/Producto/EditProducto';

export const App = () => {
  return (
    <BrowserRouter>
      <UserLogeado>
          <Routes>
                {/* Redirección de la ruta raíz a /home */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Rutas de autenticación */}
                <Route path="/login" element={
                  <RedirectByAuth>
                    <Login />
                  </RedirectByAuth>
                } />

                <Route path="/register" element={
                  <RedirectByAuth>
                    <Register />
                  </RedirectByAuth>
                } />


                {/* Ruta protegida para /home */}
                 
                <Route
                  path="/home"
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }>
                  
                 <Route path="/home" element={<Contenedor/>} />   
                 <Route path="/home/user" element={<User/>} />   
                 <Route path="/home/vender" element={<Vender/>} /> 
                  <Route path="/home/favorito" element={<Favoritos/>} /> 
                  <Route path="/home/buzon" element={<Buzon/>} />
                  <Route path="/home/producto/:idProducto" element={<Producto/>} />
                  <Route path="/home/producto/editproduct/:idProducto" element={<EditProducto/>} />
                  <Route path="/home/edituser" element={<EditUser/>} />

                </Route>
               
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <h1>Perfil de usuario</h1>
                    </RequireAuth>
                  }
                />
          </Routes>
      </UserLogeado>
    </BrowserRouter>
  );
};
