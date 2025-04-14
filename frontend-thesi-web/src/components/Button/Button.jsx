import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  onClick,
  variant,
  icon,
  iconPosition = 'right', 
  type = 'button'
}) => {
  const variants = {
    enabled: styles.enabled,
    disabled: styles.disabled,
    upload: styles.upload,
    success: styles.success,
    cancel: styles.cancel,
    transparent: styles.transparent,
    none: styles.none
  };

  const iconClass =
    iconPosition === 'left' ? styles.iconLeft : styles.iconRight;

  return (
    <button
      className={`${variants[variant]}`}
      onClick={onClick}
      type={type}
    >
      {icon && iconPosition === 'left' && (
        <span className={iconClass}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={iconClass}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
