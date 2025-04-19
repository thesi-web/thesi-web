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
    none: styles.none,
    activeL: styles.activeL,
    deactivatedL: styles.deactivatedL,
    activeR: styles.activeR,
    deactivatedR: styles.deactivatedR,
    likert: styles.likertScale,
    deactivated: styles.deactivated,
  };

  const iconClass =
    iconPosition === 'left' ? styles.iconLeft : styles.iconRight;

  return (
    <button
      className={`${styles.button} ${styles[variant] || ''}`}
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
