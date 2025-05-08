import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FirstTitle, FirstSubTitle,
  FirstButton, FirstLink
} from '../../../../components'; // Ajuste o caminho se necessário
import styles from './Etapa4.module.css'; // Criaremos este arquivo para estilos

const Etapa4 = ({ irParaProximaEtapa, irParaEtapaAnterior, navigate, formErrors, onFotoSelect, initialFoto }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let objectUrl = null;
    if (initialFoto && initialFoto instanceof File) {
      objectUrl = URL.createObjectURL(initialFoto);
      setPreviewUrl(objectUrl);
    } else {
      // Se initialFoto é null ou não é um File, e já existe um previewUrl no estado, limpa ele.
      // Isso é importante se a foto for removida (initialFoto se torna null).
      if (previewUrl) { // previewUrl aqui é o valor do estado
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }

    // Cleanup function para revogar o object URL quando initialFoto mudar
    // ou quando o componente for desmontado.
    return () => {
      if (objectUrl) { // Só revoga se um novo objectUrl foi criado neste efeito específico
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [initialFoto]); // Dependência em initialFoto


  const handleFileProcessed = (file) => {
    if (file && file.type.startsWith('image/')) {
      onFotoSelect(file); // Atualiza o estado global (formData.foto)
    } else {
      onFotoSelect(null); // Limpa o arquivo no estado global se for inválido
      if (file) {
        // Você pode querer mostrar um erro para o usuário aqui
        // Ex: setFormErrors(prev => ({...prev, foto: "Por favor, selecione um arquivo de imagem válido."}))
        // Para isso, setFormErrors precisaria ser passado como prop.
        console.warn("Arquivo selecionado não é uma imagem válida.");
      }
    }
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChangeEvent = (event) => {
    const file = event.target.files[0];
    handleFileProcessed(file);
    if (event.target) {
        event.target.value = null; // Permite selecionar o mesmo arquivo novamente
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleFileProcessed(file);
  };

  return (
    <>
      <b><FirstTitle texto="Cadastro" tamanho="2.5rem" cor="#004D40" /></b><br />
      <FirstSubTitle texto="Escolha sua melhor foto ;)" tamanho="28px" cor="#00695C" /><br />

      <div
        className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''} ${previewUrl ? styles.hasPreview : ''}`}
        onClick={previewUrl ? handleTriggerFileInput : (!isDragging ? handleTriggerFileInput : undefined)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTriggerFileInput(); }}
        aria-label={previewUrl ? "Alterar foto de perfil" : "Selecionar foto de perfil"}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChangeEvent}
          style={{ display: 'none' }}
          accept="image/*"
        />
        {previewUrl ? (
          <div className={styles.imagePreviewWrapper}>
            <img src={previewUrl} alt="Preview da foto de perfil" className={styles.imagePreview} />
            <div className={styles.imagePreviewOverlay}>
              <span>Alterar foto</span>
            </div>
          </div>
        ) : (
          <span className={styles.uploadPlaceholder}>
            {isDragging ? "Solte a imagem aqui" : "Clique para escolher ou arraste uma foto"}
          </span>
        )}
      </div>

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