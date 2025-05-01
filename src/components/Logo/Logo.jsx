import style from './Logo.module.css';

const Logo = () => {
    return(
        <img className={style.logo} src="/src/assets/icons/IconeSite.png" alt="Flink Logo" />
    );
}

export { Logo };