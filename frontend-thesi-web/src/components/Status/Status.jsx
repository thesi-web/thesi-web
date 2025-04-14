import React from 'react';
import styles from './Status.module.css';

const Status = ({ status }) => {

  let statusText = '';
  let statusClass = '';

  switch (status) {
    case 'atrasado':
      statusText = 'Atrasado';
      statusClass = styles.atrasado;
      break;
    case 'entregue':
      statusText = 'Entregue';
      statusClass = styles.entregue;
      break;
    default:
      statusText = 'Em andamento';
      statusClass = styles.emAndamento;
  }

  return (
    <div className={`${styles.status} ${statusClass}`}>
      {statusText}
    </div>
  );
};

export default Status;
