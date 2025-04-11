import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = "primary" }) => {
  
  const base = styles.base;

  const variants = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
  };

  return (
    <button
      className={`${base} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
