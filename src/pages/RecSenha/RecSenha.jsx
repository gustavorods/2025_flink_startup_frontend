import React, { useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import KeyIcon from '@mui/icons-material/VpnKey'

import {
  FirstCard,
  FirstTitle,
  FirstSubTitle,
  FirstTextField,
  FirstButton,
  FirstLink
} from '../../components'

const RecSenha = () => {
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
    <FirstCard>
      <FirstTitle texto="Recuperar senha" tamanho="30px" cor="#004D40" />
      <br />

      {step === 1 && (
        <>
          <FirstSubTitle texto="Relaxa, acontece com todos" tamanho="1rem" cor="#00695C" />
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
            <br />
            <FirstButton texto="Enviar código" tamanho="1rem" cor="#388E3C" tipo="submit" />
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <FirstSubTitle texto="Enviamos um código :)" tamanho="1rem" cor="#00695C" />
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
            <br />
            <FirstButton texto="Continuar" tamanho="1rem" cor="#2E7D32" tipo="submit" />
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <FirstSubTitle texto="Qual será sua nova senha? :O" tamanho="1rem" cor="#00695C" />
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
            />
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
            <br />
            <FirstButton texto="Definir nova senha" tamanho="1rem" cor="#2E7D32" tipo="submit" />
          </form>
        </>
      )}

      <br />
      <FirstLink texto="Recuperar Senha" destino="#" cor="#00695C" tamanho="1rem" />
      <br />
      <FirstLink texto="Criar Conta" destino="#" cor="#00695C" tamanho="1rem" />
    </FirstCard>
  )
}

export { RecSenha }
