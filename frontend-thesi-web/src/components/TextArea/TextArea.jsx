import React from 'react'
import styles from './TextArea.module.css'

const TextArea = ( {placeholder, onChange, maxLength} ) => {
  return (
    <textarea className={styles.textarea} placeholder={placeholder} onChange={onChange} maxLength={maxLength} required >
    </textarea>
  )
}

export default TextArea
