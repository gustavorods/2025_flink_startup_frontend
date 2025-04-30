import React from 'react'
import style from './Login.module.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock';
import { FirstCard, FirstTitle, FirstSubTitle, FirstTextField, FirstButton, FirstLink } from '../../components'

const Login = () => {
  return (
    <>
      <FirstCard>
        <FirstTitle texto="Login" tamanho="30px" cor="#004D40"/> {/* O título vai para dentro do FirstCard */}<br/>
        <FirstSubTitle texto="Olá, que bom que você voltou!" tamanho="1rem" cor="#00695C" /><br/>

        <FirstSubTitle texto="Email" tamanho="1rem" cor="#00695C"icon={PersonOutlineIcon} />
        <FirstTextField placeholder="Digite seu Email" tipo="email" tamanho="1rem" />
<br/><br/>
        <FirstSubTitle texto="Senha" tamanho="1rem" cor="#00695C"icon={LockIcon} />
        <FirstTextField placeholder="Digite seu Email" tipo="email" tamanho="1rem" />
<br/><br/>
        <FirstButton texto="Entrar" tamanho="1rem" cor="#388E3C" tipo="submit" />
<br></br><br></br>
        <FirstLink texto="Recuperar Senha" destino = '#' cor = '#00695C' tamanho = '1rem'/><br/>
        <FirstLink texto="Criar Conta" destino = '#' cor = '#00695C' tamanho = '1rem'/>



      </FirstCard>
    </>
  );
};



export { Login }

