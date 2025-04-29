import React, { useState } from 'react';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import styles from './FormHeuristica.module.css';

const FormHeuristica = ({
  heuristica,
  setHeuristica,
  anotacao,
  setAnotacao,
  recomendacao,
  setRecomendacao,
  severidade,
  setSeveridade,
  handleSeveridade,
  idProjeto,
  imagemComMarca,
  onSave,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSeveridade, setSelectedSeveridade] = useState(severidade);

  const SubmitHeuristica = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      const response1 = await fetch(imagemComMarca);
      const blob = await response1.blob();

      const formData = new FormData();
      formData.append('imagem', blob, 'imagem.png');

      const uploadResponse = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Erro ao enviar imagem para o servidor');
      }

      const uploadData = await uploadResponse.json();
      const imagemAWSURL = uploadData.url;

      const body = {
        heuristica,
        anotacao,
        recomendacao,
        severidade,
        imagem: imagemAWSURL,
      };

      const response = await fetch('http://localhost:3000/api/heuristic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'projeto-id': idProjeto,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        onSave();
      } else {
        const errorData = await response.json();
        console.error(`Erro: ${errorData.erro}`);
      }

    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
  };

  const handleSeveridadeClick = (valor) => {
    setSelectedSeveridade(valor); // Atualiza o valor da severidade
    handleSeveridade(valor); // Chama o método passado por props, caso necessário
  };

  return (
    <form onSubmit={SubmitHeuristica} method="POST" encType="multipart/form-data">
      <label className='label'>Heurística</label>
      <select value={heuristica} onChange={(e) => setHeuristica(e.target.value)}>
        <option value={0}>Visibilidade do Status do Sistema</option>
        <option value={1}>Correspondência entre o Sistema e o Mundo Real</option>
        <option value={2}>Controle e Liberdade do Usuário</option>
        <option value={3}>Consistência e Padrões</option>
        <option value={4}>Prevenção de Erros</option>
        <option value={5}>Reconhecimento em vez de Lembrança</option>
        <option value={6}>Flexibilidade e Eficiência de Uso</option>
        <option value={7}>Design Estético e Minimalista</option>
        <option value={8}>Reconhecer, Diagnosticar e se Recuperar de Erros</option>
        <option value={9}>Ajuda e Documentação</option>
      </select>

      <label className='label'>Problemas</label>
      <TextArea
        placeholder="Descreva os problemas encontrados"
        value={anotacao}
        onChange={(e) => setAnotacao(e.target.value)}
        maxLength={200}
        required
      />

      <label className='label'>Recommendations</label>
      <TextArea
        placeholder="Escreva as recomendações para os problemas encontrados"
        value={recomendacao}
        onChange={(e) => setRecomendacao(e.target.value)}
        maxLength={200}
        required
      />

      <label>Grau de severidade</label>
      <div className={styles.buttonContainer}>
        {[1, 2, 3, 4, 5].map((valor) => (
          <Button
            key={valor}
            onClick={() => handleSeveridadeClick(valor)}
            variant={selectedSeveridade === valor ? 'secondary' : 'primary'}
          >
            {valor}
          </Button>
        ))}
      </div>

      <Button id='form_btn' variant="secondary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

export default FormHeuristica;
