import style from './NavbarSemLogin.module.css'
import { useNavigate } from 'react-router-dom';
  
import { FirstButton, Logo } from '../index'

const NavbarSemLogin = ({showButton = true }) => {
    const navigate = useNavigate();
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <Logo />
            </div>

            {showButton && (
                <div className={style.botao_login}>
                    <FirstButton 
                    texto="Login"
                    cor="transparent" 
                    onClick={() => navigate('/login')} // aqui é o pulo do gato
                    style={{
                        color: 'var(--green-text)',
                        border: '2px solid var(--green-primary)',
                        width: '8rem'
                    }} />
                </div>
            )}
        </div>
    );
}

export { NavbarSemLogin };
