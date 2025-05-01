import style from './NavbarSemLogin.module.css'
import { FirstButton, Logo } from '../index'

const NavbarSemLogin = ({showButton = true }) => {
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
