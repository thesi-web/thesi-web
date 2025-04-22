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
      <label className='label'>Signo semiótico</label>
        <div className={styles.buttonContainer}>
          <Button
            value="estatico"
            variant={signo === "estatico" ? "highcontrast" : "lowcontrast"}
            onClick={() => handleSigno("estatico")}
          >
            Static
          </Button>
          <Button
            value="dinamico"
            variant={signo === "dinamico" ? "highcontrast" : "lowcontrast"}
            onClick={() => handleSigno("dinamico")}
          >
            Dynamic
          </Button>
          <Button
            value="meta"
            variant={signo === "meta" ? "highcontrast" : "lowcontrast"}
            onClick={() => handleSigno("meta")}
          >
            Meta
          </Button>
        </div>

      <label className='label'>O signo comunica sua função?</label>
      <TextArea placeholder="diga se a função do elemento foi facilmente entendida pelo usuário" onChange={handleAnotacaoSemiotica} value={anotacaoSemiotica} maxLength={200} required />

      <label className='label'>Recomendações</label>
      <TextArea placeholder="escreva as recomendações para os problemas encontrados" onChange={handleRecomendacaoSemiotica} value={recomendacaoSemiotica} maxLength={200} required />

      <Button id='form_btn' variant='secondary' type={"submit"} disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};

export default FormSemiotica;
