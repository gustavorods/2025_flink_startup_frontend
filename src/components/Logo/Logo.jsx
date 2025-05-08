import style from './Logo.module.css';

const Logo = () => {
    return(
        <img className={style.logo} src="https://i.imgur.com/IUc40bc.png" alt="Flink Logo" />
    );
}

export { Logo };