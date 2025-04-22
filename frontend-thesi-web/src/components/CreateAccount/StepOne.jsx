import React, { useState } from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import axios from "axios";

const StepOne = ({ email, setEmail, verificationCode, setVerificationCode, nextStep }) => {

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
      const response = await axios.post('http://localhost:3000/api/confirm/token', { 
        email, 
        token: verificationCode, });
      nextStep(); // Callback para o próximo passo
    } catch (error) {
      setMessage("Código inválido ou expirado.");
    }
  };

  return (
    <div>
      <form onSubmit={tokenSent ? handleValidateToken : handleSendToken}>
        <InputText
          label="Institutional e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={tokenSent}
          placeholder={'enter your e-mail address'}
        />
        <div className={'subtitle'} > Use your @fatec.sp.gov.br domain email to participate in collaborative projects </div>

        {tokenSent && (
          <>
            <InputText
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <div className={'subtitle'} >We've sent a code to your inbox </div>
          </>
        )}

          <Button type={"submit"} variant={"secondary"} id={"form_btn"} >
            {tokenSent ? "Check my code" : "Get code"}
          </Button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default StepOne;
