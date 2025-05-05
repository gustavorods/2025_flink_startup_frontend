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

  const esportes = [
    'Futebol',
    'Vôlei',
    'Natação',
    'Ciclismo',
    'Corrida',
    'Skate',
    'Basquete',
    'Tênis',
    'Handebol',
  ]


  const toggleEsporte = (esporte) => {
    setFormData((prev) => {
      const novosEsportes = prev.esportes.includes(esporte)
        ? prev.esportes.filter((e) => e !== esporte)
        : [...prev.esportes, esporte];
      return { ...prev, esportes: novosEsportes };
    });
  };

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
        const emailCheck = await verificarEmailExiste(formData.email);
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

      <FirstCard className={style.Cadastro}>

        {etapa === 1 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b>
            <FirstSubTitle texto="O primeiro Passo é o mais importante!" tamanho="24px" cor="#00695C" />

            <FirstSubTitle texto="Nome" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
            <FirstTextField
              placeholder="Digite seu Nome"
              tipo="text"
              tamanho="1rem"
              value={formData.nome}
              // Usa a nova função para limpar erro ao digitar
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
              // Usa a nova função para limpar erro ao digitar
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
              // Usa a nova função para limpar erro ao digitar
              onChange={(e) => handleInputChange(e, 'email')}
            />
            {/* 3. Renderiza o erro se existir */}
            {formErrors.email && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.email}</p>}
            <div style={{ marginBottom: '15px' }}></div> 

            <FirstButton
              texto="Continuar"
              tamanho="1rem"
              cor="#388E3C"
              tipo="button"
              onClick={irParaProximaEtapa}
            />
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
        )}

        {etapa === 2 && (
          <>
            <b><FirstTitle texto="Crie sua senha" tamanho="2.5rem" cor="#004D40" /></b><br />
            <FirstSubTitle texto="Proteja sua conta com uma senha segura" tamanho="24px" cor="#00695C" /><br />

            <FirstSubTitle texto="Senha" tamanho="1rem" cor="#00695C" icon={LockIcon} />
            <FirstTextField
              placeholder="Digite sua senha"
              tipo="password"
              tamanho="1rem"
              value={formData.password}
              // Usa a nova função para limpar erro ao digitar
              onChange={(e) => handleInputChange(e, 'password')}
            />
            {formErrors.password && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.password}</p>}<br /><br />

            <FirstSubTitle texto="Confirmar senha" tamanho="1rem" cor="#00695C" icon={LockIcon} />
            <FirstTextField
              placeholder="Confirme sua senha"
              tipo="password"
              tamanho="1rem"
              // Usa a nova função para limpar erro ao digitar
              onChange={(e) => {
                handleInputChange(e, 'confirmPassword');
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
              value={formData.confirmPassword}
            />
            {formErrors.confirmPassword && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.confirmPassword}</p>}<br /><br />

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <FirstButton
                texto="Voltar"
                tamanho="1rem"
                cor="#FFA000" // Cor diferente para Voltar
                tipo="button"
                onClick={irParaEtapaAnterior}
              />
              <FirstButton
                texto="Continuar"
                tamanho="1rem"
                cor="#388E3C"
                tipo="button"
                onClick={irParaProximaEtapa}
              />
            </div>
          </>
        )}

        {etapa === 3 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b> <br />
            <FirstSubTitle texto="O que você gosta de fazer?" tamanho="26px" cor="#00695C" /><br />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginTop: '10px' }}>
              {esportes.map((esporte) => (
                <FirstButton
                  key={esporte}
                  texto={esporte}
                  tamanho="1rem"
                  cor={formData.esportes.includes(esporte) ? '#2E7D32' : '#81C784'}
                  onClick={() => toggleEsporte(esporte)}
                />
              ))}
            </div>
            {/* Erro para a seleção de esportes */}
            {formErrors.esportes && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '10px' }}>{formErrors.esportes}</p>}

            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <FirstButton
                texto="Voltar"
                tamanho="1rem"
                cor="#FFA000"
                tipo="button"
                onClick={irParaEtapaAnterior}
              />
              <FirstButton
                texto="Continuar"
                tamanho="1rem"
                cor="#388E3C"
                tipo="button"
                onClick={irParaProximaEtapa}
              />
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
        )}

        {etapa === 4 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b><br />
            <FirstSubTitle texto="Escolha sua melhor foto;)" tamanho="28px" cor="#00695C" /><br />

            <FileButton texto="Escolher foto" tamanho="0.8rem"></FileButton>

            <br /><br />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <FirstButton
                texto="Voltar"
                tamanho="1rem"
                cor="#FFA000"
                tipo="button"
                onClick={irParaEtapaAnterior}
              />
              <FirstButton
                texto="Continuar"
                tamanho="1rem"
                cor="#388E3C"
                tipo="button"
                onClick={irParaProximaEtapa}
              />
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
        )}
        {etapa === 5 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /><br /></b>
            <FirstSubTitle texto="Quais Sao Suas Redes Sociais?" tamanho="1.5rem" cor="#00695C" /><br />
            <FirstSubTitle texto="Instagram (Opcional)" tamanho="1rem" cor="#00695C" icon={InstagramIcon} />
            <FirstTextField
              placeholder="Instagram"
              tipo="text"
              tamanho="1rem"
              value={formData.redes_sociais.instagram}
              onChange={(e) =>
                setFormData({
                  // Limpa erro específico se houver (opcional, mais complexo para objetos aninhados)
                  // formErrors: { ...formErrors, redes_sociais: { ...formErrors.redes_sociais, instagram: undefined } },
                  ...formData,
                  redes_sociais: {
                    ...formData.redes_sociais,
                    instagram: e.target.value,
                  },
                })
              }
            />
            {formErrors.instagram && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.instagram}</p>}
            <div style={{ marginBottom: '10px' }}></div>

            <FirstSubTitle texto="X (Opcional)" tamanho="1rem" cor="#00695C" icon={XIcon} />
            <FirstTextField
              placeholder="X"
              tipo="text"
              tamanho="1rem"
              value={formData.redes_sociais.x}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  redes_sociais: {
                    ...formData.redes_sociais,
                    x: e.target.value,
                  },
                })
              }
            />
            {formErrors.x && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.x}</p>}
            <div style={{ marginBottom: '10px' }}></div>

            <FirstSubTitle texto="TikTok (Opcional)" tamanho="1rem" cor="#00695C" icon={AudiotrackIcon} />
            <FirstTextField
              placeholder="TikTok"
              tipo="text"
              tamanho="1rem"
              value={formData.redes_sociais.tiktok}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  redes_sociais: {
                    ...formData.redes_sociais,
                    tiktok: e.target.value,
                  },
                })
              }
            />
            {formErrors.tiktok && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.tiktok}</p>}
            <div style={{ marginBottom: '20px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <FirstButton
                texto="Voltar"
                tamanho="1rem"
                cor="#FFA000"
                tipo="button"
                onClick={irParaEtapaAnterior}
              />
              <FirstButton
                texto="Continuar"
                tamanho="1rem"
                cor="#388E3C"
                tipo="button"
                onClick={irParaProximaEtapa}
              />
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
        )}


        {etapa === 6 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b>
            <div style={{ marginBottom: '10px' }}></div>
            
            <FirstSubTitle texto="Como Gostaria de ser Chamado?" tamanho="24px" cor="#00695C" />
            <div style={{ marginBottom: '10px' }}></div>

            <FirstSubTitle texto="Nome" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
            <FirstTextField
              placeholder="Como gostaria de ser chamado?"
              tipo="text"
              tamanho="1rem"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                handleInputChange(e, 'username');
              }}
            />
            {formErrors.username && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.username}</p>}
            <div style={{ marginBottom: '20px' }}></div>



            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <FirstButton
                texto="Voltar"
                tamanho="1rem"
                cor="#FFA000"
                tipo="button"
                onClick={irParaEtapaAnterior}
              />
              <FirstButton
                texto="Finalizar Cadastro"
                tamanho="1rem"
                cor="#388E3C"
                tipo="button"
                onClick={async () => {
                  try {
                    // Validação final da etapa 6 antes de enviar
                    etapa6Schema.parse({ username: formData.username });
                    setFormErrors({}); // Limpa erros se passou na validação final
                    // Cria um novo objeto sem o confirmPassword antes de enviar
                    const dadosParaEnviar = { ...formData };
                    delete dadosParaEnviar.confirmPassword;
                    console.log(dadosParaEnviar); // Verifica o objeto antes de enviar
                    const resultado = await register(dadosParaEnviar); // Envia o objeto filtrado
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
                }}
              />
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
        )}

      </FirstCard>

    </div>

  )
}

export { Cadastro }
