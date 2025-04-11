import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import '../styles/AvaliarProjeto.css';
import ProjetoModal from '../components/ProjetoModal';

const AvaliarProjeto = () => {
  const { projetoId } = useParams();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedPrototipo, setSelectedPrototipo] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState(0);
  const [totalImagens, setTotalImagens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idImagem, setIdImagem] = useState([]);
  const [idProjeto, setIdProjeto] = useState([]);
  const [imagens, setImagens] = useState([]);  //retorna uma array de objetos com as imagens do projeto!
  const [arquivos, setArquivos] = useState([]);


  const statusClass = (status) => {
    switch (status) {
      case "INICIALIZADO":
        return "inicializado";
      case "EM ANDAMENTO":
        return "andamento";
      case "ATRASADO":
        return "atrasado";
      case "FINALIZADO":
        return "finalizado";
      default:
        return "";
    }
  };

  // Buscanco o Projeto: 
  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recuperar-projeto/${projetoId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        }); 
        if (!response.ok) {
          throw new Error('Erro ao buscar o projeto.');
        }
        const data = await response.json();
        setProjeto(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

    };

    fetchProjeto();
  }, [projetoId]);

  // Buscando as imagens do projeto: 
  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recuperar-imagens/${projetoId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        }); 
        if (!response.ok) {
          throw new Error('Erro ao buscar as imagens do projeto.');
        }
        const data = await response.json();
        setImagens(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

    };

    fetchProjeto();
  }, [projetoId]);

  // Buscando os arquivos do projeto: 
  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recuperar-arquivos/${projetoId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        }); 
        if (!response.ok) {
          throw new Error('Erro ao buscar os arquivos projeto.');
        }
        const data = await response.json();
        setArquivos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

    };

    fetchProjeto();
  }, [projetoId]);
  
  const handleOpenModal = (imagemId, idProjeto) => {
    setOpenModal(true);
    setIdImagem(imagemId);
    setIdProjeto(idProjeto);
  };
  
  const handleFinalizarAvaliacao = () => {
      navigate(`/avaliacao-consolidada/${projetoId}`);
  };
  
  const handleDownload = (arquivo) => {
    // Verifica se o arquivo contém o Buffer
    const arquivoBuffer = arquivo.ds_arquivo.data || arquivo.ds_arquivo; // Caso o ds_arquivo já seja um Buffer diretamente
    if (!arquivoBuffer) {
        console.error('Arquivo não encontrado!');
        return;
    }

    // Tenta detectar o tipo MIME com base na extensão do arquivo
    const fileExtension = arquivo.nm_arquivo.split('.').pop().toLowerCase();
    let mimeType;

    switch (fileExtension) {
        case 'pdf':
            mimeType = 'application/pdf';
            break;
        case 'jpg':
        case 'jpeg':
            mimeType = 'image/jpeg';
            break;
        case 'png':
            mimeType = 'image/png';
            break;
        case 'doc':
            mimeType = 'application/msword';
            break;
        case 'docx':
            mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        default:
            console.error('Tipo MIME não reconhecido!');
            return;
    }

    // Converte o Buffer para um Blob com o tipo MIME correto
    const blob = new Blob([new Uint8Array(arquivoBuffer)], { type: mimeType });

    console.log(blob);

    // Cria um URL temporário para o Blob
    const url = URL.createObjectURL(blob);

    // Cria um elemento de link para simular o clique
    const link = document.createElement('a');
    link.href = url;

    // Define o nome do arquivo a ser baixado
    link.download = arquivo.nm_arquivo || 'arquivo_download'; // Nome do arquivo para download

    // Simula o clique no link para iniciar o download
    link.click();

    // Libera o objeto URL após o download
    URL.revokeObjectURL(url);
};

const handleAvaliar = async () => {
  try {
    const response = await fetch('http://localhost:3001/avaliar/', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idImagem: idImagem, 
        idProjeto: idProjeto,
      }),
    });
    if (!response.ok) {
      throw new Error('Erro ao validar a imagem.');
    }
    setOpenModal(!openModal)
  } catch (err) {
    setError(err.message);
  } 
};

useEffect(() => {
setTotalImagens(imagens.length);
}, [imagens]);

useEffect(() => {
  if (imagens.length > 0) {
    const avaliadas = imagens.filter(imagem => imagem.st_avaliacao === 1);
    setAvaliacoes(avaliadas.length);
  }
}, [imagens]);


 // Tratamento de carregamento ou erro
 if (loading) {
  return <div>Carregando projeto...</div>;
}

if (error) {
  return <div>Erro: {error}</div>;
}

if (!projeto) {
  return <div>Projeto não encontrado.</div>;
}


  return (
    <div className='avaliar-projeto-container'>
      <Navbar />
    
        <div>
          <div className="thesi-titulo-lilas-secao">{projeto.nm_projeto}</div>
          <div className='status-container'>
              <div className={`thesi-status-${statusClass(projeto.ds_status)}`} >{projeto.ds_status}</div>
          </div>
          <div>
            <div className="ap-texto-container">
              <div className="thesi-label ">Objetivo do Projeto:</div>
              <div className="thesi-texto-form">{projeto.ds_projeto}</div>
            </div>
            <div className="ap-texto-container">
              <div className="thesi-label">Tipos de Usuário:</div>
              <div className="thesi-texto-form">{projeto.ds_usuario}</div>
            </div>
            <div className="ap-texto-container">
              <div className="thesi-label">Data de Criação:</div>
              <div className="thesi-texto-form">{projeto.dt_criacao}</div>
            </div>
            <div className="ap-texto-container">
              <div className="thesi-label">Entregar até:</div>
              <div className="thesi-texto-form">{projeto.dt_entrega}</div>
            </div>
          </div>

<div className='ajusta'>
          <div className="thesi-titulo-lilas-secao"> protótipos </div>
          <div className="ap-prototipos-container">
            {imagens.map((imagem, index) => (
              <button
                key={imagem.id_imagem}
                className='thesi-botao-prototipo'
                onClick={() => handleOpenModal(imagem.id_imagem, imagem.id_projeto)}
                disabled={imagem.st_avaliacao === 1}
              >
                Ver Protótipo {index + 1}
            </button>
            
            ))}
          </div>

          {arquivos.length > 0 && (
            <>
                <div className="thesi-titulo-lilas-secao">arquivos</div>
                <div className="ap-prototipos-container">
                    {arquivos.map((arquivo, index) => (
                      <div className='ap-arquivos-container'>
                        <i 
                          className="bi bi-file-earmark-arrow-down ap-icon"
                          onClick={() => handleDownload(arquivo)}
                        ></i>
                        <div className='ap-nome-arquivos' key={index}>{arquivo.nm_arquivo}</div>
                      </div>
                    ))}
                </div>

                <div className="ap-botao-container">
          <div>
            {projeto.ds_status === 'FINALIZADO' ? (
              <button
                className='thesi-botao-roxo'
                onClick={handleFinalizarAvaliacao}
              >
                VER RELATÓRIO
              </button>
            ) : (
              <button
                className='thesi-botao-azul'
                onClick={handleFinalizarAvaliacao}
                disabled={avaliacoes !== totalImagens || projeto.ds_status === 'FINALIZADO'}
              >
                FINALIZAR AVALIAÇÃO
              </button>
            )}
          </div>
        </div>
            </>
          )}


        </div>
</div>
      

      <ProjetoModal
        isOpen={openModal}
        setModalOpen={() => setOpenModal(!openModal)}
        nome={projeto.nm_projeto}
        idImagem={idImagem}
        idProjeto={idProjeto}
        selectedPrototipo={selectedPrototipo}
        handleAvaliar={handleAvaliar}
      />

    </div>
  );
};

export default AvaliarProjeto;
