import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login} from './pages';
import {Cadastro} from './pages';
import { RecSenha } from './pages'

const Router = () => {
  return (
      <Routes>
        <Route path="/Login" element={<Login />} /> {/* Certificando-se de que a URL seja /Login */}
        <Route path ="/RecSenha" element={<RecSenha />} /> 
        <Route path="/Cadastro" element={<Cadastro />} /> {/* Certificando-se de que a URL seja /Login */}
      </Routes>
  );
};

export {Router};
