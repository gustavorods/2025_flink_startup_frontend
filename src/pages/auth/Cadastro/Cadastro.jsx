import React, { useState } from 'react'
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
  FirstCard, FirstTitle, FirstSubTitle,
  FirstTextField, FirstButton, FirstLink,
  FileButton, Logo
} from '../../../components'


const Cadastro = () => {
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
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


  const navigate = useNavigate()

  const [etapa, setEtapa] = useState(1)

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

  const irParaProximaEtapa = () => {
    setEtapa(etapa + 1)
  }

  return (

    <div className={style.Cadastro}>

      <FirstCard className={style.Cadastro}>

        {etapa === 1 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b> <br />
            <FirstSubTitle texto="O primeiro Passo é o mais importante!" tamanho="24px" cor="#00695C" /><br />

            <FirstSubTitle texto="Nome" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
            <FirstTextField
              placeholder="Digite seu Nome"
              tipo="text"
              tamanho="1rem"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            /><br /><br />

            <FirstSubTitle texto="Sobrenome" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
            <FirstTextField
              placeholder="Digite seu Sobrenome"
              tipo="text"
              tamanho="1rem"
              value={formData.sobrenome}
              onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
            /><br /><br />

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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            /><br /><br />

            <FirstSubTitle texto="Confirmar senha" tamanho="1rem" cor="#00695C" icon={LockIcon} />
            <FirstTextField
              placeholder="Confirme sua senha"
              tipo="password"
              tamanho="1rem"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            /><br /><br />

            <FirstButton
              texto="Continuar"
              tamanho="1rem"
              cor="#388E3C"
              tipo="button"
              onClick={irParaProximaEtapa}
            />
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

            <br /><br />
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

        {etapa === 4 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b><br />
            <FirstSubTitle texto="Escolha sua melhor foto;)" tamanho="28px" cor="#00695C" /><br />

            <FileButton texto="Escolher foto" tamanho="0.8rem"></FileButton>

            <br /><br />
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
                  ...formData,
                  redes_sociais: {
                    ...formData.redes_sociais,
                    instagram: e.target.value,
                  },
                })
              }
            /><br /><br />
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
            /><br /><br />
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
            /><br /><br />


            <br /><br />
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


        {etapa === 6 && (
          <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b><br />
            <FirstSubTitle texto="Como Gostaria de ser Chamado?" tamanho="24px" cor="#00695C" /><br />
            <FirstSubTitle texto="Nome" tamanho="1rem" cor="#00695C" icon={PersonOutlineIcon} />
            <FirstTextField
              placeholder="Como gostaria de ser chamado?"
              tipo="text"
              tamanho="1rem"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            /><br /><br />


            <br /><br />
            <FirstButton
              texto="Finalizar Cadastro"
              tamanho="1rem"
              cor="#388E3C"
              tipo="button"
              onClick={async () => {
                // Cria um novo objeto sem o confirmPassword antes de enviar
                const dadosParaEnviar = { ...formData };
                delete dadosParaEnviar.confirmPassword;
                const resultado = await register(dadosParaEnviar); // Envia o objeto filtrado
                if (resultado.success) {
                  navigate('/home'); // ou a página inicial
                } else {
                  alert(`Erro: ${resultado.error}`);
                }
              }}
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

      </FirstCard>

    </div>

  )
}

export { Cadastro }
