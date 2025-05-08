import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { motion } from 'framer-motion';
import {
  FirstTitle, FirstSubTitle,
  FirstTextField, FirstButton, FirstLink
} from '../../../../components';
import * as z from 'zod'; // Importe Zod
import { etapa6Schema } from '../../../../validation'; // Importe o schema específico

const Etapa6 = ({ formData, handleInputChange, formErrors, setFormErrors, irParaEtapaAnterior, navigate, register }) => {

  const handleFinalSubmit = async () => {
    try {
      // Validação final da etapa 6 antes de enviar
      etapa6Schema.parse({ username: formData.username });
      setFormErrors({}); // Limpa erros se passou na validação final
      // Cria um novo objeto sem o confirmPassword antes de enviar
      setFormErrors({});

      // Construir o objeto FormData
      const data = new FormData();
      data.append('nome', formData.nome);
      data.append('sobrenome', formData.sobrenome);
      data.append('email', formData.email);
      data.append('password', formData.password); // O backend deve fazer o hash
      data.append('username', formData.username);

      // Para o array de esportes, anexe cada esporte individualmente
      // O backend (com bibliotecas como multer) geralmente consegue reconstruir isso como um array.
      if (formData.esportes && formData.esportes.length > 0) {
        formData.esportes.forEach(esporte => {
          data.append('esportes', esporte); // Swagger: items: type: string
        });
      } else {
        // Se o backend espera um array vazio, você pode precisar enviar algo como:
        // data.append('esportes', JSON.stringify([])); ou não enviar nada se for opcional.
        // Pela documentação, parece opcional.
      }

      // Para o objeto redes_sociais, envie como uma string JSON
      data.append('redes_sociais', JSON.stringify(formData.redes_sociais));

      if (formData.foto) { // 'foto' é o nome do campo no estado formData
        data.append('profileImage', formData.foto, formData.foto.name); // 'profileImage' é o nome esperado pela API
      }

      // Chame a função register do AuthContext com o objeto FormData
      const resultado = await register(data);
      
      if (resultado.success) {
        navigate('/timeline');
      } else {
        // Usa setFormErrors para exibir erro do backend
        setFormErrors({ geral: resultado.error || 'Erro desconhecido ao finalizar cadastro.' });
      }
    } catch (error) { // Captura erro de validação da etapa 6
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach(err => { // Coleta todos os erros
          if (err.path.length > 0) fieldErrors[err.path[0]] = err.message;
        });
        setFormErrors(fieldErrors);
      } else {
        setFormErrors({ geral: 'Ocorreu um erro inesperado ao finalizar.' });
        console.error("Erro inesperado no submit:", error);
      }
    }
  };

  return (
    <>
      <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b>
      <div style={{ marginBottom: '10px' }}></div>

      <FirstSubTitle texto="Como Gostaria de ser Chamado?" tamanho="24px" cor="#00695C" />
      <div style={{ marginBottom: '10px' }}></div>

      <FirstSubTitle texto="Nome de Usuário" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
      <FirstTextField
        placeholder="Como gostaria de ser chamado?"
        tipo="text"
        tamanho="1rem"
        value={formData.username}
        onChange={(e) => handleInputChange(e, 'username')}
      />
      {formErrors.username && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.username}</p>}
      {formErrors.geral && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '10px' }}>{formErrors.geral}</p>} {/* Para erros gerais do backend */}
      <div style={{ marginBottom: '20px' }}></div>

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
            texto="Finalizar Cadastro"
            tamanho="1rem"
            cor="#388E3C"
            tipo="button"
            onClick={handleFinalSubmit}
          />
        </motion.button>
      </div>
      <div style={{ marginBottom: '30px' }}></div>

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

export default Etapa6;