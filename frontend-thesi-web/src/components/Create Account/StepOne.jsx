import React, { useState } from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import axios from "axios";

const StepOne = ({ email, setEmail, verificationCode, setVerificationCode, nextStep }) => {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [tokenSent, setTokenSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendToken = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/request/token', { email });
      setTokenSent(true);
      setMessage("Código enviado para seu e-mail.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Erro ao enviar código.");
    }
  };

  const handleValidateToken = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/confirm/token', { email, token });
      nextStep(); // Callback para o próximo passo
    } catch (error) {
      setMessage("Código inválido ou expirado.");
    }
  };

  return (
    <div>
      <form onSubmit={tokenSent ? handleValidateToken : handleSendToken}>
        <InputText
          label="Institutional email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={tokenSent}
        />
        <p> Use your @fatec.sp.gov.br domain email to participate in collaborative projects </p>

        {tokenSent && (
          <>
            <InputText
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <p>We've sent a code to your inbox </p>
          </>
        )}

        <Button type="submit" variant="primary">
          {tokenSent ? "Verificar Código" : "Enviar Código"}
        </Button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default StepOne;
