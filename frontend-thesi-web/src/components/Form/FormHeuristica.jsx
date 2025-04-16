import React from 'react';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import styles from './FormHeuristica.module.css'

const FormHeuristica = ({
  heuristica,
  novaHeuristica,
  anotacao,
  recomendacao,
  severidade,
  handleHeuristica,
  handleAnotacao,
  handleRecomendacao,
  handleSeveridade,
  setNovaHeuristica,
  SubmitHeuristica,
  isSubmitting,
}) => {
  return (
    <form onSubmit={SubmitHeuristica} className={styles.form} >
      <div className='label'>Heurística</div>
      <select value={heuristica} onChange={handleHeuristica}>
        <option>Visibilidade do Status do Sistema</option>
        <option>Correspondência entre o Sistema e o Mundo Real</option>
        <option>Controle e Liberdade do Usuário</option>
        <option>Consistência e Padrões</option>
        <option>Prevenção de Erros</option>
        <option>Reconhecimento em vez de Lembrança</option>
        <option>Flexibilidade e Eficiência de Uso</option>
        <option>Design Estético e Minimalista</option>
        <option>Reconhecer, Diagnosticar e se Recuperar de Erros</option>
        <option>Ajuda e Documentação</option>
      </select>

      <div className='label'>Problemas</div>
      <TextArea placeholder="descreva os problemas encontrados" onChange={handleAnotacao} value={anotacao} maxLength={200} required />
    
      <div className='label'>Recomendações</div>
      <TextArea placeholder="escreva as recomendações para os problemas encontrados" onChange={handleRecomendacao} value={recomendacao} maxLength={200} required />
      
      <div className='label'>Grau de severidade</div>
      <div className={styles.buttonContainer}>
        {[1, 2, 3, 4, 5].map((valor) => (
          <Button
            key={valor}
            value={valor}
            variant={`likertScale${valor}`}
            onClick={handleSeveridade}
          >
            {valor}
          </Button>
        ))}
      </div>

      <Button variant={'save'} type={"submit"} disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};

export default FormHeuristica;
