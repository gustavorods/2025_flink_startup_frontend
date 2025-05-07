import React from 'react'
import { FirstButton} from '../../components'
import styles from './SportButton.module.css'

const SportButton = ({ label, selected, onClick, className='' }) => {
  return (
    <FirstButton
      texto={label}
      cor={selected ? '#388E3C' : '#fff'}
      tamanho="1.2rem"
      onClick={onClick}
      className={`${styles.buttonBase} ${selected ? styles.selected : styles.unselected} ${className}`}
    />
  )
}

export {SportButton}
