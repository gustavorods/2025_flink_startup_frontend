import React, { useState } from 'react'
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock';
import { FirstCard, FirstTitle, FirstSubTitle, FirstTextField, FirstButton, FirstLink } from '../../../components'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      // Armazena o token JWT no sessionStorage
      sessionStorage.setItem('token', response.data.token);

      // Redireciona para o timeline após login bem-sucedido
      navigate('/RecSenha')

    } catch (err) {
      // Verifica se há uma resposta de erro do backend
      if (err.response) {
        // Erro com resposta do servidor
        setError(err.response.data.error || 'Erro desconhecido no servidor');
      } else if (err.request) {
        // Erro de rede ou requisição
        setError('Erro de rede. Tente novamente.');
      } else {
        // Erro na configuração da requisição
        setError('Erro ao configurar a requisição.');
      }
      console.error('Erro no login', err);
    }
  };

  return (
    <>

      <div className={style.Login}>
        <form onSubmit={handleSubmit}>
          <FirstCard>
            <b><FirstTitle texto="Login" tamanho="2.5rem" cor="#004D40" /> </b>{/* O título vai para dentro do FirstCard */}<br />
            <FirstSubTitle texto="Olá, que bom que você voltou!" tamanho="23px" cor="#00695C" /><br />

            <FirstSubTitle texto="Email" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
            <FirstTextField
              placeholder="Digite seu Email"
              tipo="email"
              tamanho="1rem"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />
            <FirstSubTitle
              texto="Senha"
              tamanho="1rem"
              cor="#00695C"
              icon={LockIcon}
            />
            <FirstTextField
              placeholder="Digite sua Senha"
              tipo="password"
              tamanho="1rem"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
        </form>
      </div>

    </>
  );
};



export { Login }

