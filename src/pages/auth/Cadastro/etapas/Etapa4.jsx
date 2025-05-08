import React from 'react';
import { motion } from 'framer-motion';
import {
  FirstTitle, FirstSubTitle,
  FileButton, FirstButton, FirstLink
} from '../../../../components'; // Ajuste o caminho se necessário

// Adicione formErrors como prop, caso queira exibir erros específicos desta etapa no futuro
const Etapa4 = ({ irParaProximaEtapa, irParaEtapaAnterior, navigate, formErrors }) => {
  // Se você for adicionar lógica de upload de arquivo, precisará de formData e handleInputChange/handleFileChange

  return (
    <>
      <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b><br />
      <FirstSubTitle texto="Escolha sua melhor foto ;)" tamanho="28px" cor="#00695C" /><br />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 
          Para funcionalidade real de upload, FileButton precisaria ser um input type="file" estilizado
          ou interagir com um input type="file" oculto.
          Você também precisaria de uma função para lidar com a seleção do arquivo.
        */}
        <FileButton texto="Escolher foto" tamanho="0.8rem" />
      </motion.button>
      {/* Exemplo de como exibir um erro para esta etapa, se houver */}
      {formErrors && formErrors.foto && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.foto}</p>}
      <br /><br />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FirstButton
            texto="Voltar"
            tamanho="1rem"
            cor="#FFA000"
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

export default Etapa4;