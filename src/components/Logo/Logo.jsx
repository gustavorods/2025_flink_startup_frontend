import style from './Logo.module.css';

const Logo = () => {
    return(
        <img className={style.logo} src="https://i.pinimg.com/originals/19/07/31/19073125e883c05eae1d19dec14c964c.jpg" alt="Flink Logo" />
    );
}

export { Logo };