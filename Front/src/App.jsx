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
import {VenderProdcto} from './components/Producto/VenderProdcto'
import { Favoritos } from './components/Favorito/Favoritos';
import {Buzon} from './components/Buzon/Buzon';
import { Producto } from './components/Producto/Producto';
import { EditUser } from './components/Tu/EditUser';
import { ProductoFavorito } from './components/Favorito/ProductoFavorito';
import { UsuarioFavorito } from './components/Favorito/UsuarioFavorito';
import { EditProducto } from './components/Producto/EditProducto';
import {Chat} from './components/Buzon/Chat'
import {ForgotPassword} from './components/Login&Register/ForgotPassword'
import { Buscar } from './components/Buscar/Buscar';
import { Administrar } from './components/Administrar/Administrar';
import { ProductoAdmin } from './components/Administrar/ProductoAdmin';
import { UsuarioAdmin } from './components/Administrar/UsuarioAdmin';
import { RequireAdmin } from './components/routes/RequireAdmin';
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

                <Route path="/ForgotPassword" element={
                  <RedirectByAuth>
                    <ForgotPassword />
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
                  
                 <Route path="/home" element={<Contenedor/>} >
                  <Route path='/home/' element={<Buscar/>}/>
                  </Route>   
                 <Route path="/home/user" element={<User/>}>
                  <Route path="/home/user/:id" element={<User/>}/>
                 
                 </Route>
                 <Route path="/home/vender" element={<VenderProdcto/>} /> 
                  <Route path="/home/favorito" element={<Favoritos/>} >
                  <Route path="/home/favorito/" element={<ProductoFavorito/>} />
                  <Route path="/home/favorito/usuarios" element={<UsuarioFavorito/>} />
                   </Route>
                   
                
                  <Route path="/home/administrar" element={
                    <RequireAdmin>
                      <Administrar/>
                    </RequireAdmin>
                  } >
                  <Route path="/home/administrar/" element={<ProductoAdmin/>} />
                  <Route path="/home/administrar/usuarios" element={<UsuarioAdmin/>} />
                   </Route> 
                 
                 

                  <Route path="/home/buzon" element={<Buzon/>} >
                  <Route path="/home/buzon/:ideC" element={<Chat/>}/>
                  
                   </Route>
                  <Route path="/home/producto/:idProducto" element={<Producto/>} />
                  <Route path="/home/producto/editproduct/:idProducto" element={<EditProducto/>} />
                  <Route path="/home/edituser" element={<EditUser/>} />
                   
                </Route>
               
                <Route
                  path="*"
                  element={
                    <RequireAuth>
                      <h1>404 error</h1>
                    </RequireAuth>
                  }
                />
               
          </Routes>
      </UserLogeado>
    </BrowserRouter>
  );
};
