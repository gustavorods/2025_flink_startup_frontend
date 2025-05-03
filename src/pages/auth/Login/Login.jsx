import React from 'react'
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock';
import { FirstCard, FirstTitle, FirstSubTitle, FirstTextField, FirstButton, FirstLink } from '../../../components'

const Login = () => {
  const navigate = useNavigate();

  return (
    <>

      <div className={style.Login}>
        <FirstCard>
          <b><FirstTitle texto="Login" tamanho="2.5rem" cor="#004D40" /> </b>{/* O título vai para dentro do FirstCard */}<br />
          <FirstSubTitle texto="Olá, que bom que você voltou!" tamanho="23px" cor="#00695C" /><br />

          <FirstSubTitle texto="Email" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
          <FirstTextField placeholder="Digite seu Email" tipo="email" tamanho="1rem" />
          <br /><br />
          <FirstSubTitle texto="Senha" tamanho="1rem" cor="#00695C" icon={LockIcon} />
          <FirstTextField placeholder="Digite seu Email" tipo="email" tamanho="1rem" />
          <br /><br />
          <FirstButton texto="Entrar" tamanho="1rem" cor="#388E3C" tipo="submit" />
          <br></br><br></br>
          <u>
            <FirstLink
              texto="Recuperar Senha"
              onClick={() => navigate('/RecSenha')}
              cor='#00695C'
              tamanho='1rem'
            />
            <br />
          </u>
          <u><FirstLink
            texto="Criar Conta"
            onClick={() => navigate('/Cadastro')}
            cor='#00695C'
            tamanho='1rem'
          />
          </u>



        </FirstCard>
      </div>

    </>
  );
};



export { Login }

