import React from 'react';
import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';
import styles from './FormSemiotica.module.css'
import { useState } from 'react';

const FormSemiotica = ({
  handleSigno,
  signo,
  esperada,
  setEsperada,
  possivel,
  setPossivel,
  quebra,
  setQuebra,
  recomendacaoSemiotica,
  setRecomendacaoSemiotica,
  idProjeto,
  imagemComMarca,
  onSave,
}) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SubmitSemiotica = async (e) => {
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
  
      // 2. Envia os dados semióticos com o link da imagem
      const body = {
        signo,
        esperada,
        possivel,      
        quebra,      
        recomendacaoSemiotica,
        imagem: imagemAWSURL,
      };
  
      const response = await fetch('http://localhost:3000/api/semiotic', {
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

  return (
    <form onSubmit={SubmitSemiotica} method="POST" encType="multipart/form-data">
      <label>Type of sign</label>
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

      <label className='label'>Expected reading</label>
      <TextArea 
        placeholder="what the system expects the user to understand or do" 
        onChange={(e) => setEsperada(e.target.value)} 
        value={esperada} 
        maxLength={200} 
        required />

      <label className='label'>Possible reading</label>
      <TextArea 
        placeholder="what the user might understand (even if it is not ideal)." 
        value={possivel} 
        maxLength={200} 
        onChange={(e) => setPossivel(e.target.value)} 
        required />
      
      <label className='label'>Observed break</label>
      <TextArea 
        placeholder="describe how the user interpreted or acted differently than the expected reading" 
        value={quebra} 
        onChange={(e) => setQuebra(e.target.value)} 
        maxLength={200} 
        required />
      
      <label className='label'>Recommendations</label>
      <TextArea 
        placeholder="suggest visual, textual, or behavioral improvements" 
        value={recomendacaoSemiotica} 
        onChange={(e)=> setRecomendacaoSemiotica(e.target.value)} 
        maxLength={200} 
        required />

      <Button id='form_btn' variant='secondary' type={"submit"} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

export default FormSemiotica;
