import React, { createContext, useEffect, useState } from "react";

export const NotificacoesContext = createContext();

export const NotificacoesProvider = ({ children }) => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [naoLidas, setNaoLidas] = useState(0);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await fetch("http://localhost:3001/notificacoes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        setNotificacoes(data);
        setNaoLidas(data.filter((notificacao) => !notificacao.isLida).length);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotificacoes();
  }, []);

  const marcarComoLida = (idProjeto) => {
    setNotificacoes((prev) =>
      prev.map((notificacao) =>
        notificacao.id_projeto === idProjeto
          ? { ...notificacao, isLida: true }
          : notificacao
      )
    );
    setNaoLidas((prevNaoLidas) => prevNaoLidas - 1);
  };

  return (
    <NotificacoesContext.Provider
      value={{ notificacoes, naoLidas, marcarComoLida }}
    >
      {children}
    </NotificacoesContext.Provider>
  );
};
