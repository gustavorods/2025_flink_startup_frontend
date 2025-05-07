import React from 'react';
import { FirstButton, FirstTitle, NavbarSemLogin } from '../../components';// ajuste o caminho conforme sua pasta
import style from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const Home = () => {
    const navigate = useNavigate();
return (
  <>
  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
  <div className={style.container}>
  <div className={style.overlay}></div>
      <NavbarSemLogin/>

      <div className={style.conteudo}>
        <FirstTitle texto="Combine seu ritmo" tamanho="4rem" cor="#333" /><br></br>
          <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => console.log('hover started!')}
        >
        <FirstButton texto="Criar Conta" tamanho="2rem" cor="#388E3C" onClick={() => navigate('/cadastro')} />
        </motion.button> </div>
    </div>
    </motion.div>
  </>
  )
}


export { Home }