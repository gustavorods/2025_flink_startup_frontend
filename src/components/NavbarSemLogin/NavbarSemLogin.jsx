import style from './NavbarSemLogin.module.css'
import { FirstButton } from '../index'

const NavbarSemLogin = () => {
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <img src="" alt="Flink logo" />
            </div>

            <div className={style.botao_login}>
                <FirstButton 
                texto={"Login"}/>
            </div>
        </div>
    );
}

export { NavbarSemLogin };