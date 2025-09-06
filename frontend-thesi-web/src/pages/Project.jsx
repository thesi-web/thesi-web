import React, { useState, useEffect, useCallback } from 'react';
import Status from '../components/Status/Status'
import styles from "./Project.module.css"
import Cover from '../components/Cover/Cover'
import Carroussel from '../components/Carroussel/Carroussel'
import Button from '../components/Button/Button'
import { useParams } from 'react-router-dom';
import MessageModal from '../components/Modal/MessageModal';
import MarksModal from '../components/Modal/MarksModal';
import TextArea from '../components/TextArea/TextArea';
import InputText from '../components/InputText/InputText';
import { getUsuarioLogado } from '../hooks/auth';

const Project = () => {

  const [projeto, setProjeto] = useState({ imagens: [] });
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marksModal, setMarksModal] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { projetoId } = useParams();

  const [isEditing, setIsEditing] = useState(false); // <<< modo edição
  const [editForm, setEditForm] = useState({ ds_projeto: "", nm_projeto: "" }); // << campos editáveis

  // função de fetch isolada e memoizada
  const fetchProjeto = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/project/${projetoId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar o projeto.');
      }

      const data = await response.json();
      setProjeto(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projetoId]);

  const salvarEdicao = async () => {
    try {
      setLoading(true); // ativa o loading para o botão
      const response = await fetch(`${apiUrl}/api/edit/project/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ 
          idProjeto: projetoId, 
          name: editForm.nm_projeto, 
          description: editForm.ds_projeto 
        })
      });

      if (!response.ok) throw new Error("Erro ao salvar edição");

      await fetchProjeto(); // atualiza dados
      setIsEditing(false); // sai do modo edição
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // desativa o loading
    }
  };

   const uploadImages = async (files) => {
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("template", file); // backend espera "template"
      }

      const response = await fetch(`${apiUrl}/api/images/${projetoId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar imagem");
      }

      await fetchProjeto(); // atualiza imagens na tela
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProjeto();
  }, [fetchProjeto]);

  const entregarProjeto = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/project/${projetoId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      // Atualiza os dados após sucesso
      await fetchProjeto();
      setIsMessageModalOpen(false); 

    } catch (err) {
      setError(err.message);
    }
  };

  //chama o hook que retorna o id do usuário logado na aplicação
  const usuarioLogado = getUsuarioLogado();

  return (
    <div className={styles.page}>
        <Cover />
      <div className={styles.projectContainer}>

        <div className={styles.titleContainer}>
          {isEditing ? (
            <InputText
              placeholder={'digite o nome do projeto'}
              value={editForm.nm_projeto}
              onChange={(e) => setEditForm({ ...editForm, nm_projeto: e.target.value })}
              variant={'editing'}
            />
          ) : (
            <div className={"project-title"}>{projeto.nm_projeto}</div>
          )}
          <div className={styles.statusContainer}>
            {/* só mostra o lápis se o usuário logado for o criador */}
            {usuarioLogado?.id === projeto.id_criador && 
              projeto.ds_status !== 'entregue' && 
              projeto.ds_status !== 'finalizado' && (
                <div 
                className={styles.icon}
                onClick={() => {
                  setEditForm({
                    ds_projeto: projeto.ds_projeto || "",
                    nm_projeto: projeto.nm_projeto || ""
                  });
                  setIsEditing(true);
                }}>
                    <i className="bi bi-pencil-square"></i>
                  </div>
            )}
            {(projeto.ds_status !== 'entregue' && projeto.ds_status !== 'finalizado') && (
              <div   
              className={styles.icon}
              onClick={() => setMarksModal(true)}
              >
              <i className="bi bi-inboxes"></i>
            </div>
          )}
          <Status status={`${projeto.ds_status}`} />
          </div>
        </div>

        <p>Criado dia {projeto.dt_criacao} por {projeto.criador} </p>

        <div className={styles.objectiveContainer}>
          {isEditing ? (
            <TextArea
              placeholder={'descreva sucintamente o objetivo do projeto'}
              value={editForm.ds_projeto}
              onChange={(e) => setEditForm({ ...editForm, ds_projeto: e.target.value })}
              maxLength={100}
            />
          ) : (
            projeto.ds_projeto
          )}
        </div>

        {isEditing && (
          <div className={styles.buttonEditContainer}>
            <Button variant="primary" onClick={() => {
              setIsEditing(false);
              setEditForm({ nm_projeto: "", ds_projeto: "" });
            }}>Cancelar</Button>
            <Button 
              variant="secondary" 
              onClick={salvarEdicao}  
              disabled={loading}
              loading={loading}
              id={'form_btn'}
            >
              {loading ? "" : "Salvar alterações"}
            </Button>
          </div>
        )}
        
        <Carroussel 
          images={projeto.imagens} 
          projetoId={projetoId} 
          isDisabled={projeto.ds_status === 'entregue' || projeto.ds_status === 'finalizado'}  
          onUpload={uploadImages}
          onDelete={fetchProjeto} 
          />
        <div className={styles.buttonContainer}>

        {(projeto.ds_status !== 'entregue' && projeto.ds_status !== 'finalizado') && (
          <Button type="submit" variant="secondary" onClick={() => setIsMessageModalOpen(true)}>
            Entregar projeto
          </Button>
        )}

        {isMessageModalOpen && (
          <MessageModal
            isMessageOpen={isMessageModalOpen}
            setMessageModalOpen={() => setIsMessageModalOpen(false)}
            onClick={entregarProjeto}
            title={'Submit Project'}
            message={`Are you sure? You won't be able to make changes after submission.`}
            buttonMessage={'Submit'}
          />
        )}
        {marksModal && (
          <MarksModal
            isMarksModalOpen={marksModal}
            setMarksModalOpen={() => setMarksModal(false)}
            projetoId={projetoId}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Project;
