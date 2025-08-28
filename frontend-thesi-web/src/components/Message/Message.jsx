import React from 'react'
import Button from '../Button/Button'
import styles from './Message.module.css'
import { useNavigate } from 'react-router-dom';

const Message = ( { mensagem, link, assunto, nome, nomeProjeto, nomeUsuario } ) => {

  const navigate = useNavigate();

  return (
    <div className={styles.messageContainer} onClick={() => navigate(`${link}`)}>

    <div className={styles.titleContainer}>
        
        <span className={styles.name}>
          {nome}
        </span>
        
        <span className='subtext'>
          {assunto}
        </span>
    </div>
    
    <div className={styles.nameProject}>
      {nomeProjeto}
    </div>
      
    <div className={styles.contentContainer}  >
    <span className="subtext">
        <span className={styles.highlited}>
        @{nomeUsuario}
        </span> 
        {mensagem}
    </span>
    </div>


      
    </div>
  )
}

export default Message
