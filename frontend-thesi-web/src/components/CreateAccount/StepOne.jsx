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
      setMessageToken("Invalid or expired code.");
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
          variant={message ? 'errorInput' : 'input'}
          label="Institutional e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={tokenSent || isLoading}
          placeholder={'enter your e-mail address'}
        />
        {message &&  <div className={'errorMessage'} >{message} <i className="bi bi-exclamation-circle-fill"></i> </div>}
        <div className={'subtitle'}>Use your @fatec.sp.gov.br domain email to participate in collaborative projects</div>

        {tokenSent && (
          <>
            <InputText
              variant={ messageToken ? 'errorInput' : 'input'}
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isLoading}
            />
            {messageToken &&  <div className={'errorMessage'}>{messageToken} <i className="bi bi-exclamation-circle-fill"></i> </div>}
            <div className={'subtitle'}>We've sent a code to your inbox</div>
          </>
        )}

        <Button type="submit" variant="secondary" id="form_btn" disabled={isLoading}>
          {isLoading ? "Please wait..." : tokenSent ? "Check my code" : "Get code"}
        </Button>

        
      </form>
    </div>
  );
};

export default StepOne;
