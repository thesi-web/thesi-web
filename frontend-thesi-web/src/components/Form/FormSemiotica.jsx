import React from 'react';
import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';
import styles from './FormSemiotica.module.css'
import { useState } from 'react';



const FormSemiotica = ({
  signo,
  anotacaoSemiotica,
  recomendacaoSemiotica,
  handleSigno,
  handleAnotacaoSemiotica,
  handleRecomendacaoSemiotica,
  SubmitSemiotica,
  isSubmitting,
}) => {
  
  return (

    <form onSubmit={SubmitSemiotica} className={styles.form}>
      <div className='label'>Signo semiótico</div>
        <div className={styles.buttonContainer}>
          <Button
            value="estatico"
            variant={signo === "estatico" ? "activeL" : "deactivatedL"}
            onClick={() => handleSigno("estatico")}
          >
            Estático
          </Button>
          <Button
            value="dinamico"
            variant={signo === "dinamico" ? "active" : "deactivated"}
            onClick={() => handleSigno("dinamico")}
          >
            Dinâmico
          </Button>
          <Button
            value="meta"
            variant={signo === "meta" ? "activeR" : "deactivatedR"}
            onClick={() => handleSigno("meta")}
          >
            Meta
          </Button>
        </div>

      <div className='label'>O signo comunica sua função?</div>
      <TextArea placeholder="diga se a função do elemento foi facilmente entendida pelo usuário" onChange={handleAnotacaoSemiotica} value={anotacaoSemiotica} maxLength={200} required />

      <div className='label'>Recomendações</div>
      <TextArea placeholder="escreva as recomendações para os problemas encontrados" onChange={handleRecomendacaoSemiotica} value={recomendacaoSemiotica} maxLength={200} required />

      <Button variant={'save'} type={"submit"} disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};

export default FormSemiotica;
