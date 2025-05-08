import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { motion } from 'framer-motion';
import {
  FirstTitle, FirstSubTitle,
  FirstTextField, FirstButton, FirstLink
} from '../../../../components'; // Ajuste o caminho se necessário

const Etapa1 = ({ formData, handleInputChange, formErrors, irParaProximaEtapa, navigate }) => {
  return (
    <>
      <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b>
      <FirstSubTitle texto="O primeiro Passo é o mais importante!" tamanho="24px" cor="#00695C" />

      <FirstSubTitle texto="Nome" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
      <FirstTextField
        placeholder="Digite seu Nome"
        tipo="text"
        tamanho="1rem"
        value={formData.nome}
        onChange={(e) => handleInputChange(e, 'nome')}
      />
      {formErrors.nome && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.nome}</p>}
      <div style={{ marginBottom: '10px' }}></div>

      <FirstSubTitle texto="Sobrenome" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
      <FirstTextField
        placeholder="Digite seu Sobrenome"
        tipo="text"
        tamanho="1rem"
        value={formData.sobrenome}
        onChange={(e) => handleInputChange(e, 'sobrenome')}
      />
      {formErrors.sobrenome && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.sobrenome}</p>}
      <div style={{ marginBottom: '10px' }}></div>

      <FirstSubTitle texto="Email" tamanho="1rem" cor="#00695C" icon={EmailIcon} />
      <FirstTextField
        placeholder="Digite seu Email"
        tipo="text"
        tamanho="1rem"
        value={formData.email}
        onChange={(e) => handleInputChange(e, 'email')}
      />
      {formErrors.email && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.email}</p>}
      <div style={{ marginBottom: '15px' }}></div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FirstButton
          texto="Continuar"
          tamanho="1rem"
          cor="#388E3C"
          tipo="button"
          onClick={irParaProximaEtapa}
        />
      </motion.button>
      <br /><br />
      <u>
        <FirstLink
          texto="Já tenho uma conta"
          onClick={() => navigate('/Login')}
          cor="#00695C"
          tamanho="1rem"
        />
      </u>
    </>
  );
};

export default Etapa1;