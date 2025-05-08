import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import InstagramIcon from '@mui/icons-material/Instagram';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import XIcon from '@mui/icons-material/X';
import style from './Cadastro.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../../../context'
import { motion } from 'framer-motion';

import {
  etapa1Schema,
  etapa2Schema,
  etapa3Schema,
  etapa4Schema,
  etapa6Schema, // Importa o novo schema
} from '../../../validation'; // ajuste o caminho

import {
  FirstCard, FirstTitle, FirstSubTitle,
  FirstTextField, FirstButton, FirstLink,
  FileButton, Logo
} from '../../../components'
import * as z from 'zod'; // Importe Zod para usar ZodError

import Etapa1 from './etapas/Etapa1';
import Etapa2 from './etapas/Etapa2';
import Etapa3 from './etapas/Etapa3';
import Etapa4 from './etapas/Etapa4';
import Etapa5 from './etapas/Etapa5';
import Etapa6 from './etapas/Etapa6';


const Cadastro = () => {
  const { register, verificarEmailExiste } = useContext(AuthContext); // Obtenha a função do contexto

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    confirmPassword: '',
    esportes: [],
    redes_sociais: {
      instagram: '',
      x: '',
      tiktok: '',
    },
    username: '',
  });
  const [formErrors, setFormErrors] = useState({}); // 1. Estado para guardar erros

  const navigate = useNavigate()

  const [etapa, setEtapa] = useState(1)

  // Removida a função local verificarEmailExiste

  // Função para limpar erros de um campo específico ao digitar
  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
    if (formErrors[fieldName]) {
      // Limpa o erro do campo específico
      setFormErrors(prevErrors => ({ ...prevErrors, [fieldName]: undefined }));
    }
  };

  const irParaProximaEtapa = async () => { // Tornar a função async
    try {
      setFormErrors({}); // Limpa erros anteriores no início da validação da etapa
      if (etapa === 1) {
        // 1. Valida os campos da etapa com Zod
        etapa1Schema.parse({
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
        });

        // 2. Verifica se o e-mail já existe usando a função do contexto
        console.log("Verificando e-mail:", formData.email); // Log do e-mail a ser verificado
        const emailCheck = await verificarEmailExiste(formData.email);
        // console.log("Resultado da verificação de e-mail:", emailCheck); // Log do resultado da verificação
        if (emailCheck.error) {
          // Define erro específico para o campo email
          setFormErrors({ email: emailCheck.error });
          return; // Para a execução se houve erro na verificação
        }
        if (emailCheck.exists) {
          // Define erro específico para o campo email
          setFormErrors({ email: 'Este e-mail já está cadastrado. Por favor, use outro.' });
          return; // Para a execução se o e-mail já existe
        }
      }

      if (etapa === 2) {
        etapa2Schema.parse({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
      }

      if (etapa === 3) {
        etapa3Schema.parse({ esportes: formData.esportes });
      }

      if (etapa === 4) {
        // Assumindo que etapa 4 é a foto e não tem schema Zod aqui
        // Se etapa 5 (redes sociais) usa etapa4Schema, a validação deveria estar no bloco if (etapa === 5)
      }
      if (etapa === 5) { // Validação para Redes Sociais
        etapa4Schema.parse(formData.redes_sociais);
      }
      if (etapa === 6) { // Validação para Username (ao avançar de etapa, se houver)
        etapa6Schema.parse({ username: formData.username });
      }

      // Se passou na validação, avança
      setEtapa(etapa + 1);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Mapeia erros do Zod para o estado formErrors
        const fieldErrors = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            // Associa o erro ao primeiro campo no path
            fieldErrors[err.path[0]] = err.message;
          }
        });
        // Define o estado com TODOS os erros encontrados na etapa
        setFormErrors(fieldErrors);

      } else {
        // Erro genérico (pode ser associado a um campo 'geral' ou logado)
        // Se não for erro do Zod, pode ser um erro da verificação de email ou outro
        // Se já houver um erro específico (como email), não sobrescreva com 'geral'
        if (Object.keys(formErrors).length === 0) {
          setFormErrors({ geral: 'Ocorreu um erro inesperado.' });
        }
        console.error("Erro inesperado:", error);
      }
    }
  }


  const irParaEtapaAnterior = () => {
    setEtapa(etapa - 1);
    setFormErrors({}); // Limpa erros ao voltar
  };


  return (

    <div className={style.Cadastro}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
        <FirstCard className={style.Cadastro}>

          {etapa === 1 && (
            <Etapa1
              formData={formData}
              handleInputChange={handleInputChange}
              formErrors={formErrors}
              irParaProximaEtapa={irParaProximaEtapa}
              navigate={navigate}
            />
          )}

          {etapa === 2 && (
            <Etapa2
              formData={formData}
              handleInputChange={handleInputChange}
              formErrors={formErrors}
              irParaProximaEtapa={irParaProximaEtapa}
              irParaEtapaAnterior={irParaEtapaAnterior}
            />
          )}

          {etapa === 3 && (
            <Etapa3
              formData={formData}
              formErrors={formErrors}
              setFormData={setFormData} // Passa setFormData
              irParaProximaEtapa={irParaProximaEtapa}
              irParaEtapaAnterior={irParaEtapaAnterior}
              navigate={navigate}
            />
          )}

          {etapa === 4 && (
            <Etapa4
              formErrors={formErrors}
              irParaProximaEtapa={irParaProximaEtapa}
              irParaEtapaAnterior={irParaEtapaAnterior}
              navigate={navigate}
            />
          )}
          {etapa === 5 && (
            <Etapa5
              formData={formData}
              setFormData={setFormData} // Passa setFormData
              formErrors={formErrors}
              setFormErrors={setFormErrors} // Passa setFormErrors
              irParaProximaEtapa={irParaProximaEtapa}
              irParaEtapaAnterior={irParaEtapaAnterior}
              navigate={navigate}
            />
          )}


          {etapa === 6 && (
            <Etapa6
              formData={formData}
              handleInputChange={handleInputChange}
              formErrors={formErrors}
              setFormErrors={setFormErrors} // Passa setFormErrors
              irParaEtapaAnterior={irParaEtapaAnterior}
              navigate={navigate}
              register={register} // Passa a função register do AuthContext
            />
          )}

        </FirstCard>
      </motion.div>
    </div>

  )
}

export { Cadastro }
