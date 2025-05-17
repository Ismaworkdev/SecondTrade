import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <>
     <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/">
    Home
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/">
    About
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/">
    Contact
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/">
    Services
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/">
    Portfolio
    </Link>
    <Link className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/">
    Blog
    </Link>
    </>
  )
}
