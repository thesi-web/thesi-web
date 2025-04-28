import React from 'react';
import styles from './InputText.module.css';

const InputText = ({ label, type, name, value, onChange, placeholder, required, variant = 'input' }) => { 
  return (
    <div>
      <label> {label} </label>
      <input
        type={type}
        name={name} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={styles[variant]} // Usando a interpolação correta para acessar a classe do CSS module
      />
    </div>
  );
}

export default InputText;
