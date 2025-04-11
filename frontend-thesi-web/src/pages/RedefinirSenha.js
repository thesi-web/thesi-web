import { useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

function RedefinirSenha() {
  const { token } = useParams(); // Captura diretamente o token da URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("Ambos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/redefinir-senha", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setMessage("Senha redefinida com sucesso!");
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Erro ao redefinir a senha.");
      }
    } catch (err) {
      setMessage("Erro na requisição. Tente novamente.");
    }
  };

  return (
    <div className="recuperar-senha-container">
    <div className="thesi-container">
      <div className="thesi-titulo">Redefinir Senha</div>
      <form className="thesi-formulario" onSubmit={handleSubmit}>
        <input
          className="thesi-input"
          type="password"
          placeholder="Digite sua nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="thesi-input"
          type="password"
          placeholder="Confirme sua nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="thesi-texto">
          Ao redefinir sua senha, lembre-se de seguir estas dicas para manter sua conta segura: <br></br>
            <li> Crie uma senha forte: Use uma combinação de letras maiúsculas e minúsculas, números e símbolos.</li>
            <li> Evite informações óbvias: Não utilize nomes, datas de nascimento ou sequências fáceis de adivinhar.</li>
            <li> Mantenha a exclusividade: Use uma senha única para esta conta.</li> <br></br>
          Sua segurança é nossa prioridade!
          </div>
        <button className="thesi-botao-roxo" type="submit">
          REDEFINIR SENHA
        </button>
        {message && <div className="thesi-mensagem">{message}</div>}
      </form>
    </div>
  </div>
  );
}

export default RedefinirSenha;
