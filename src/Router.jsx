import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages';
import { Cadastro } from './pages';
import { RecSenha } from './pages'
import { UserListTest } from './test';
import { Erro404 } from './pages';

const Router = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} /> {/* Certificando-se de que a URL seja /Login */}
      <Route path="/RecSenha" element={<RecSenha />} />
      <Route path="/Cadastro" element={<Cadastro />} /> {/* Certificando-se de que a URL seja /Cadastro */}

      <Route path="*" element={<Erro404 />} />

      {import.meta.env.VITE_SHOW_TEST_PAGES === 'true' && (
        <Route path="/UserListTest" element={<UserListTest />} />
      )}
      
    </Routes>
  );
};

export { Router };
