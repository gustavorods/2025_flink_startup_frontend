import React from 'react';
import { motion } from 'framer-motion';
import {
    FirstTitle, FirstSubTitle,
    FirstButton, FirstLink
} from '../../../../components'; // Ajuste o caminho se necessário

const Etapa3 = ({ formData, setFormData, formErrors, irParaProximaEtapa, irParaEtapaAnterior, navigate }) => {
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
    ];

    const toggleEsporte = (esporte) => {
        setFormData((prev) => {
            const novosEsportes = prev.esportes.includes(esporte)
                ? prev.esportes.filter((e) => e !== esporte)
                : [...prev.esportes, esporte];
            return { ...prev, esportes: novosEsportes };
        });
    };
    
    return (
        <>
            <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b> <br />
            <FirstSubTitle texto="O que você gosta de fazer?" tamanho="26px" cor="#00695C" /><br />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginTop: '10px', justifyContent: 'center' }}>
                {esportes.map((esporte) => (
                    <motion.button
                        key={esporte} // Adicionado key ao motion.button que é o elemento raiz do map
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ border: 'none', background: 'none', padding: 0, margin: 0 }} // Reset button styles
                    >
                        <FirstButton
                            texto={esporte}
                            tamanho="1rem"
                            cor={formData.esportes.includes(esporte) ? '#2E7D32' : '#81C784'}
                            onClick={() => toggleEsporte(esporte)}
                        />
                    </motion.button>
                ))}
            </div>
            {/* Erro para a seleção de esportes */}
            {formErrors.esportes && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '10px' }}>{formErrors.esportes}</p>}

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

export default Etapa3;