import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StepTwo = ({
  name, setName,
  phone, setPhone,
  email,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  errorMessage,
  successMessage,
  handleSubmit,
  prevStep
}) => {

  const handlePhoneChange = (event) => {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 11) input = input.slice(0, 11);
    if (input.length > 2) input = `(${input.slice(0, 2)})${input.slice(2)}`;
    if (input.length > 8) input = `${input.slice(0, 9)}-${input.slice(9)}`;
    setPhone(input);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value.slice(0, 50));
    if (name === 'password') setPassword(value);
    if (name === 'confirmpassword') setConfirmPassword(value);
  };

  return (
    <form className="re-formulario" onSubmit={handleSubmit}>
      <input type="text" name="phone" value={phone} onChange={handlePhoneChange} placeholder="Telefone" required />
      <input type="text" name="name" value={name} onChange={handleChange} placeholder="Nome" required />
      <input type="password" name="password" value={password} onChange={handleChange} placeholder="Senha" required />
      <input type="password" name="confirmpassword" value={confirmPassword} onChange={handleChange} placeholder="Confirmar Senha" required />

      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}

      <button type="button" onClick={prevStep}>Voltar</button>
      <button type="submit">Criar Conta</button>
    </form>
  );
};


export default StepTwo;

  