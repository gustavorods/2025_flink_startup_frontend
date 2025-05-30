import React, { useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import style from './RecSenha.module.css'
import { motion } from 'framer-motion';
import KeyIcon from '@mui/icons-material/VpnKey'
import { useNavigate } from 'react-router-dom';


import {
  FirstCard,
  FirstTitle,
  FirstSubTitle,
  FirstTextField,
  FirstButton,
  FirstLink
} from '../../components'

const RecSenha = () => {
  const navigate = useNavigate();

  //Controla qual etapa está visivel  
  const [step, setStep] = useState(1)

  //Estados dos inputs
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  //Apenas incrementa o valor
  const avancarEtapa = () => setStep(step + 1)

  const handleEnviarCodigo = (e) => {
    e.preventDefault()
    console.log('Código enviado para:', email)
    avancarEtapa()
  }

  const handleVerificarCodigo = (e) => {
    e.preventDefault()
    console.log('Código verificado:', codigo)
    avancarEtapa()
  }

  const handleAlterarSenha = (e) => {
    e.preventDefault()
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!')
      return
    }
    console.log('Senha alterada com sucesso!')
  }

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} className={style.RecSenha}>
    <FirstCard>
      <FirstTitle texto="Recuperar senha" tamanho="2.5rem" cor="#004D40" />
      <br />

      {step === 1 && (
        <>
          <FirstSubTitle texto="Relaxa, acontece com todos" tamanho="24px" cor="#00695C" />
          <br />
          <form onSubmit={handleEnviarCodigo}>
            <FirstSubTitle
              texto="Email"
              tamanho="1rem"
              cor="#00695C"
              icon={PersonOutlineIcon}
            />
            <FirstTextField
              placeholder="example@gmail.com"
              tipo="email"
              tamanho="1rem"
              valor={email}
              aoMudar={(e) => setEmail(e.target.value)}
              requerido
            />
            <br /><br/>
            <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
>
            <FirstButton texto="Enviar código" tamanho="1rem" cor="#388E3C" tipo="submit" /></motion.button>
            <br /><br/>
            <FirstLink texto="Voltar Para Login" onClick={() => navigate('/Login')} cor="#00695C" tamanho="1rem" />
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <FirstSubTitle texto="Enviamos um código :)" tamanho="20px  " cor="#00695C" />
          <br />
          <form onSubmit={handleVerificarCodigo}>
            <FirstSubTitle
              texto="Código"
              tamanho="1rem"
              cor="#00695C"
              icon={KeyIcon}
            />
            <FirstTextField
              placeholder="Digite o código"
              tipo="text"
              tamanho="1rem"
              valor={codigo}
              aoMudar={(e) => setCodigo(e.target.value)}
              requerido
            />
            <br /><br/>
            <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
>
            <FirstButton texto="Continuar" tamanho="1rem" cor="#2E7D32" tipo="submit" />
            </motion.button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <FirstSubTitle texto="Qual será sua nova senha? :O" tamanho="20px" cor="#00695C" />
          <br />
          <form onSubmit={handleAlterarSenha}>
            <FirstSubTitle
              texto="Nova senha"
              tamanho="1rem"
              cor="#00695C"
              icon={LockIcon}
            />
            <FirstTextField
              placeholder="Nova senha"
              tipo="password"
              tamanho="1rem"
              valor={novaSenha}
              aoMudar={(e) => setNovaSenha(e.target.value)}
              requerido
            /><br/><br/>
            <FirstSubTitle
              texto="Confirmar senha"
              tamanho="1rem"
              cor="#00695C"
              icon={LockIcon}
            />
            <FirstTextField
              placeholder="Confirmar nova senha"
              tipo="password"
              tamanho="1rem"
              valor={confirmarSenha}
              aoMudar={(e) => setConfirmarSenha(e.target.value)}
              requerido
            />
            <br /><br/>
            <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
>
            <FirstButton texto="Definir nova senha" tamanho="1rem" cor="#2E7D32" tipo="submit" />
            </motion.button>
          </form>
        </>
      )}

    </FirstCard>
    </motion.div>
  )
}

export { RecSenha }
