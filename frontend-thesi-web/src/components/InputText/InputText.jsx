import React from 'react'
import styles from './InputText.module.css'

const InputText = ( { label, type, placeholder, onChange } ) => {
  return (
    <div>
        <label className={styles.label}> {label} </label>
        <input className={styles.input} type={type} placeholder={placeholder} onChange={onChange} ></input>
    </div>
  )
}

export default InputText;



