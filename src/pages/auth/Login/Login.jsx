import React, { useState, useContext } from 'react' // Importe useContext
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock';
import { FirstCard, FirstTitle, FirstSubTitle, FirstTextField, FirstButton, FirstLink } from '../../../components'
import { AuthContext } from '../../../context'; // Importe o AuthContext
// Remova a importação do axios se não for mais usada aqui

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Obtenha a função login do contexto

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpe erros anteriores

    // Use a função login do AuthContext
    const result = await login(email, password);

    if (result.success) {
      // Redireciona para o timeline após login bem-sucedido
      // TODO: Mudar para a rota correta após o login, ex: '/timeline' ou '/'
      navigate('/timeline'); // Ajuste esta rota conforme necessário
    } else {
      // Define a mensagem de erro retornada pelo AuthProvider
      setError(result.error || 'Falha no login.');
      console.error('Erro no login:', result.error);
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
