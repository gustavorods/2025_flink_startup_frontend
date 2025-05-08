import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { motion } from 'framer-motion';
import {
  FirstTitle, FirstSubTitle,
  FirstTextField, FirstButton
} from '../../../../components'; // Ajuste o caminho se necessário

const Etapa2 = ({ formData, handleInputChange, formErrors, irParaProximaEtapa, irParaEtapaAnterior }) => {
  return (
    <>
      <b><FirstTitle texto="Crie sua senha" tamanho="2.5rem" cor="#004D40" /></b><br />
      <FirstSubTitle texto="Proteja sua conta com uma senha segura" tamanho="24px" cor="#00695C" /><br />

      <FirstSubTitle texto="Senha" tamanho="1rem" cor="#00695C" icon={LockIcon} />
      <FirstTextField
        placeholder="Digite sua senha"
        tipo="password"
        tamanho="1rem"
        value={formData.password}
        onChange={(e) => handleInputChange(e, 'password')}
      />
      {formErrors.password && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.password}</p>}
      <div style={{ marginBottom: '10px' }}></div>

      <FirstSubTitle texto="Confirmar senha" tamanho="1rem" cor="#00695C" icon={LockIcon} />
      <FirstTextField
        placeholder="Confirme sua senha"
        tipo="password"
        tamanho="1rem"
        value={formData.confirmPassword}
        onChange={(e) => handleInputChange(e, 'confirmPassword')}
      />
      {formErrors.confirmPassword && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.confirmPassword}</p>}
      <div style={{ marginBottom: '20px' }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FirstButton
            texto="Voltar"
            tamanho="1rem"
            cor="#FFA000" // Cor diferente para Voltar
            tipo="button"
            onClick={irParaEtapaAnterior}
          />
        </motion.button>
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
      </div>
    </>
  );
};

export default Etapa2;