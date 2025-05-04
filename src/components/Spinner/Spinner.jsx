import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useLoading } from '../../context';  // Importa o contexto de carregamento

const Spinner = () => {
  const { loading } = useLoading();  // Acessa o estado de carregamento do contexto
  console.log('Spinner ativo?', loading);
  if (!loading) return null; // Não renderiza o spinner se não estiver carregando

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Centra o spinner na tela
      position="fixed" // Fixa o spinner na tela
      top="0"
      left="0"
      right="0"
      bottom="0"
      bgcolor="rgba(255, 255, 255, 0.5)" // Fundo semitransparente
      zIndex="9999" // Fixa o spinner acima de outros elementos
    >
      <CircularProgress />
    </Box>
  );
};

export { Spinner };
