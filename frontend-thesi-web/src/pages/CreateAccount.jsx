import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import StepOne from '../components/CreateAccount/StepOne';
import StepTwo from '../components/CreateAccount/Steptwo';
import axios from 'axios';
import styles from './CreateAccount.module.css'
import Button from "../components/Button/Button";

function CreateAccount() {

  const [step, setStep] = useState(1);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('A senha deve conter letras maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/user', {
        name,
        phone,
        email,
        password,
        confirmpassword: confirmPassword,
      });

      if (response && response.status === 201) {
        setSuccessMessage('Usuário criado com sucesso!');
        setTimeout(() => {
          navigate('/Login');
        }, 1000);
      } else {
        setErrorMessage('Erro inesperado ao criar usuário');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Erro ao criar usuário');
    }
  };

  const validatePassword = (password) => {
    return /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password) &&
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  console.log(name,phone, email, password, confirmPassword);

  return (
    
    <div>
      
      <div className={styles.navContainer}> 
        <Link to="/" >
          <Button variant={'transparent'}>
            Back 
          </Button>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center' }}> 
          Already have an account? <a style={{ marginLeft: '10px' }} href="/login" >Sign in</a>
        </div>
      </div>

    <div className={styles.container} >
      <div className={styles.titleContainer}>
        {step === 1 && (
          <>
            <div className="h1">Practical, safe.</div>
            <p>Create your Thesi account in just a few steps!</p>
          </>
        )}
        {step === 2 && (
          <>
            <div className="h1">Create your profile</div>
            <p>Here's how your Thesi profile will look to others</p>
          </>
        )}
      </div>

      {step === 1 && (
        <StepOne
          email={email}
          setEmail={setEmail}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <StepTwo
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errorMessage={errorMessage}
          successMessage={successMessage}
          handleSubmit={handleSubmit}
          prevStep={prevStep}
        />
      )}
    </div>
</div>
  );
}

export default CreateAccount;
