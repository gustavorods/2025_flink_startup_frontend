import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import XIcon from '@mui/icons-material/X';
import { motion } from 'framer-motion';
import {
    FirstTitle, FirstSubTitle,
    FirstTextField, FirstButton, FirstLink
} from '../../../../components'; // Ajuste o caminho se necessário

const Etapa5 = ({ formData, setFormData, formErrors, setFormErrors, irParaProximaEtapa, irParaEtapaAnterior, navigate }) => {

    const handleSocialChange = (e, socialNetwork) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            redes_sociais: {
                ...prev.redes_sociais,
                [socialNetwork]: value,
            }
        }));
        // Limpa erro para o campo de rede social específico
        if (formErrors && formErrors[socialNetwork]) { // Adicionada verificação para formErrors
            setFormErrors(prevErrors => ({ ...prevErrors, [socialNetwork]: undefined }));
        }
    };
    
    return (
        <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /><br /></b>
            <FirstSubTitle texto="Quais Sao Suas Redes Sociais?" tamanho="1.5rem" cor="#00695C" /><br />

            <FirstSubTitle texto="Instagram (Opcional)" tamanho="1rem" cor="#00695C" icon={InstagramIcon} />
            <FirstTextField
                placeholder="Instagram"
                tipo="text"
                tamanho="1rem"
                value={formData.redes_sociais.instagram}
                onChange={(e) => handleSocialChange(e, 'instagram')}
            />
            {formErrors.instagram && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.instagram}</p>}
            <div style={{ marginBottom: '10px' }}></div>

            <FirstSubTitle texto="X (Opcional)" tamanho="1rem" cor="#00695C" icon={XIcon} />
            <FirstTextField
                placeholder="X"
                tipo="text"
                tamanho="1rem"
                value={formData.redes_sociais.x}
                onChange={(e) => handleSocialChange(e, 'x')}
            />
            {formErrors.x && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.x}</p>}
            <div style={{ marginBottom: '10px' }}></div>

            <FirstSubTitle texto="TikTok (Opcional)" tamanho="1rem" cor="#00695C" icon={AudiotrackIcon} />
            <FirstTextField
                placeholder="TikTok"
                tipo="text"
                tamanho="1rem"
                value={formData.redes_sociais.tiktok}
                onChange={(e) => handleSocialChange(e, 'tiktok')}
            />
            {formErrors.tiktok && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{formErrors.tiktok}</p>}
            <div style={{ marginBottom: '20px' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                // onHoverStart={() => console.log('hover started!')} // Removido ou mantido conforme preferência
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
                // onHoverStart={() => console.log('hover started!')}
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

export default Etapa5;