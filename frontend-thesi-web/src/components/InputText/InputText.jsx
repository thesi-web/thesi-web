import React from 'react'
import styles from './InputText.module.css'

const InputText = ( { label, type, name, value, onChange, placeholder, required } ) => {
  return (
    <div>
        <label> {label} </label>
        <div className={styles.input}>
          <input
          type={type}
          name={name} 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        </div>
    </div>
  )
}

export default InputText;



