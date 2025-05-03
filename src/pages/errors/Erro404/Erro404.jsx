import style from './Erro404.module.css';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { FirstButton } from '../../../components';
import { useNavigate } from 'react-router-dom';

const Erro404 = () => {
    const navigate = useNavigate();
    
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h6">
                A página que você está procurando não existe.
            </Typography>
            <br />
            <FirstButton
                texto='Voltar para o início'
                cor="#388E3C"
                onClick={() => navigate('/Login')}
            />
        </Box>
    );
}

export { Erro404 }