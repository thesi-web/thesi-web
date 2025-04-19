import React, { useState } from 'react';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import styles from './FormHeuristica.module.css';

const FormHeuristica = ({
  heuristica,
  anotacao,
  recomendacao,
  severidade,
  idProjeto,
  imagemComMarca,
  handleSeveridade,
  setHeuristica,
  setAnotacao,
  setRecomendacao,
  setSeveridade,
  onSave,
}) => {

  console.log(imagemComMarca);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const SubmitHeuristica = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem('token');
  
      // CONVERSÃO: transforma a imagem do modal (string base64 ou blob URL) em Blob real
      const response1 = await fetch(imagemComMarca);
      const blob = await response1.blob(); // agora temos um Blob de verdade
  
      const formData = new FormData();
      formData.append('imagem', blob, 'imagem.png'); // nome opcional
  
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
  
      // 2. Envia os dados heurísticos com o link da imagem
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
        alert('Heurística salva com sucesso!');
        onSave();
      } else {
        const errorData = await response.json();
        console.error(`Erro: ${errorData.erro}`);
      }
  
      // Limpar os campos
      setHeuristica('');
      setAnotacao('');
      setRecomendacao('');
      setSeveridade(1);
    } catch (err) {
      console.error(err);
    }
  
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={SubmitHeuristica} className={styles.form} method="POST" encType="multipart/form-data">
      <div className='label'>Heurística</div>
      <select value={heuristica} onChange={(e) => setHeuristica(e.target.value)}>
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
      <TextArea
        placeholder="Descreva os problemas encontrados"
        value={anotacao}
        onChange={(e) => setAnotacao(e.target.value)}
        maxLength={200}
        required
      />

      <div className='label'>Recomendações</div>
      <TextArea
        placeholder="Escreva as recomendações para os problemas encontrados"
        value={recomendacao}
        onChange={(e) => setRecomendacao(e.target.value)}
        maxLength={200}
        required
      />

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

      <Button variant="save" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  );
};

export default FormHeuristica;



//activeRectangle, onSave, onCancel, idProjeto, imagemURL