import classNames from 'classnames';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant, icon, iconPosition = 'right', type = 'button', disabled }) => {

  const buttonClass = classNames(
    styles.button,
    styles[variant],
    {
      [styles.disabled]: disabled,
    }
  );

  const iconClass = classNames({
    [styles.iconLeft]: icon && iconPosition === 'left',
    [styles.iconRight]: icon && iconPosition === 'right',
  });

  return (
    <button onClick={onClick} type={type} className={buttonClass} disabled={disabled} >
      {icon && iconPosition === 'left' && <span className={iconClass}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className={iconClass}>{icon}</span>}
    </button>
  );
};

export default Button;