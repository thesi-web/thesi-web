import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

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
    <div>
   
      <form onSubmit={handleSubmit}>
        <InputText label={"Enter your phone number"} type="text" name="phone" value={phone} onChange={handlePhoneChange} placeholder="(dd) 9 0000-0000" required />
        <div className={'subtitle'}> Why do we ask for your <b>phone number</b>? </div>
        <InputText label={"Enter your name"} type="text" name="name" value={name} onChange={handleChange} placeholder="type your full name" required />
        <InputText label={"Set your password"} type="password" name="password" value={password} onChange={handleChange} placeholder="type your password" required />
        <InputText label={"Confirm your password"} type="password" name="confirmpassword" value={confirmPassword} onChange={handleChange} placeholder="confirm your password" required />

        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }} >
        <Button variant={'transparent'} type="button" onClick={prevStep}>Back</Button>
        <Button variant={'secondary'} type="submit">Create account</Button>
      </div>
      </form>
    </div>
  );
};


export default StepTwo;

  