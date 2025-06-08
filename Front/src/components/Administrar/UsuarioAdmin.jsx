import React, { useState } from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserLogeadoContext } from '../Context/UserLogeado';
import { useUserAdmin } from '../hooks/useUserAdmin';
import {UserminiDelete} from './UserminiDelete'
export const UsuarioAdmin = () => {
  const {Users} = useUserAdmin()

  return (
      <div>
                      {Users.map((usuario, index) => {
                          return <UserminiDelete  usuario={usuario} /> 
                          })}
      </div>
    )}
