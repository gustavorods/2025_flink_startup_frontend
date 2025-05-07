import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages';
import { Cadastro } from './pages';
import { RecSenha } from './pages'
import { UserListTest } from './test';
import { Erro404 } from './pages'; // Importando o componente Erro404
import { PrivateRoute } from './components';
import { Timeline } from './pages';
import { Profilepage } from './pages';
import { Home } from './pages/Home';

const Router = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} /> {/* Certificando-se de que a URL seja /Login */}
      <Route path="/RecSenha" element={<RecSenha />} />
      <Route path="/Cadastro" element={<Cadastro />} /> {/* Certificando-se de que a URL seja /Cadastro */}
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/Home" element={<Home />} /> 
      <Route path="/Profilepage" element={<Profilepage />} />
      <Route path="/user-list-test" element={<UserListTest />} />

      <Route path="*" element={<Erro404 />} />

      {/* Rota protegida */}
      {/* verifica se a variável de ambiente está definida como 'true' */}
      {/* {import.meta.env.VITE_SHOW_TEST_PAGES === 'true' && (
        <Route
          path="/user-list-test"
          element={
            <PrivateRoute>
              <UserListTest />
            </PrivateRoute>
          }
        />
      )} */}

    </Routes>
  );
};

export { Router };
