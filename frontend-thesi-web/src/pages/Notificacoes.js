import React, { useContext } from "react";
import Aviso from "../components/layout/Aviso";
import Navbar from "../components/layout/Navbar";
import { NotificacoesContext } from "../context/NotificacoesContext"; 
import EmptyNotificacoes from "../components/EmptyNotificacoes";

function Notificacoes() {

  const { notificacoes, naoLidas, marcarComoLida } = useContext(NotificacoesContext);

  return (
    <div className="notificacoes-container">
      
      <Navbar naoLidas={naoLidas} />
      {notificacoes?.length > 0 ? (
        notificacoes.map((notificacao, index) => (
          <Aviso
            key={index}
            idUsuario={notificacao.id_usuario}
            idProjeto={notificacao.id_projeto}
            nome={notificacao.nm_usuario}
            titulo={notificacao.nm_projeto}
            autor={notificacao.nm_autores}
            prazo={new Date(notificacao.dt_entrega).toLocaleDateString()}
            isLida={notificacao.isLida}
            onMarcarComoLida={marcarComoLida} 
          />
        ))
      ) : (
        < EmptyNotificacoes />
      )}
    </div>
  );
}

export default Notificacoes;
