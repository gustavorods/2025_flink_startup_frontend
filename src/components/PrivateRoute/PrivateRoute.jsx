import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context';
import { useLoading } from '../../context/LoadingContext'; // Importe o hook useLoading
import { Spinner } from '../Spinner';

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext); // Obtenha user e isAuthenticated do AuthContext
  const { isLoading } = useLoading(); // Obtenha isLoading do LoadingContext

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) { // É mais seguro verificar isAuthenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { PrivateRoute };
