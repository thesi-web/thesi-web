import React from 'react'
import Button from '../Button/Button'
import styles from './Message.module.css'


const Message = ( { mensagem, link, assunto, nome, nomeProjeto, nomeUsuario } ) => {
  return (
    <div className={styles.messageContainer}>

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
      
    <div className={styles.contentContainer}>
    <span className="subtext">
        <span className={styles.highlited}>
        @{nomeUsuario}
        </span> 
        {mensagem}
    </span>
    </div>


      <Button variant={'message'} >Check</Button>
    </div>
  )
}

export default Message
