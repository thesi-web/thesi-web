import React, { useState } from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import axios from "axios";

const StepOne = ({ email, setEmail, verificationCode, setVerificationCode, nextStep }) => {

  const [tokenSent, setTokenSent] = useState(false);
  const [message, setMessage] = useState('');
  const [messageToken, setMessageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSendToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/request/token`, { email });
      setTokenSent(true);
    } catch (error) {
      setMessage(error.response?.data?.error);
      setTimeout(() => {
       setMessage('');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${apiUrl}/api/confirm/token`, { 
        email, 
        token: verificationCode, 
      });
      nextStep(); // Callback para o próximo passo
    } catch (error) {
      setMessageToken("Código inválido ou expirado.");
    setTimeout(() => {
      setMessageToken('');
    }, 3000); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={tokenSent ? handleValidateToken : handleSendToken}>
        <InputText
          variant={message ? 'errorInput' : 'inputForm'}
          label="Email institutional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={tokenSent || isLoading}
          placeholder={'Digite seu endereço de e-mail'}
        />
        {message &&  <div className={'errorMessage'} >{message} <i className="bi bi-exclamation-circle-fill"></i> </div>}
        <div className={'subtitleForm'}>Use seu e-mail institucional @maua.br para participar de projetos colaborativos</div>

        {tokenSent && (
          <>
            <InputText
              variant={ messageToken ? 'errorInput' : 'inputForm'}
              label="Código de verificação"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isLoading}
            />
            {messageToken &&  <div className={'errorMessage'}>{messageToken} <i className="bi bi-exclamation-circle-fill"></i> </div>}
            <div className={'subtitleForm'}>Enviamos um token para sua caixa de entrada</div>
          </>
        )}

        <Button type="submit" variant="secondary" disabled={isLoading} loading={isLoading}>
          {isLoading ? "" : tokenSent ? "Conferir" : "Enviar"}
        </Button>

        
      </form>
    </div>
  );
};

export default StepOne;
