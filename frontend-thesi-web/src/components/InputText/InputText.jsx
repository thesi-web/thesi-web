import React from 'react'
import styles from './InputText.module.css'

const InputText = ( { label, type, placeholder, onChange } ) => {
  return (
    <div>
        <label> {label} </label>
        <div className={styles.input}><input type={type} placeholder={placeholder} onChange={onChange}></input></div>
    </div>
  )
}

export default InputText;



