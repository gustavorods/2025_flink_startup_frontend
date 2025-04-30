import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages';

const Router = () => {
  return (
      <Routes>
        <Route path="/Login" element={<Login />} /> {/* Certificando-se de que a URL seja /Login */}
      </Routes>
  );
};

export {Router};
