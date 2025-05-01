import React from 'react'
import { FirstButton} from '../../components'
import styles from './SportButton.module.css'

const SportButton = ({ label, selected, onClick }) => {
  return (
    <FirstButton
      texto="Default"
      cor={selected ? '#388E3C' : '#fff'}
      tamanho="1rem"
      onClick={onClick}
      className={`${styles.buttonBase} ${selected ? styles.selected : styles.unselected}`}
    />
  )
}

export {SportButton}
