import React from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const StepTwo = ({
  name, setName,
  email,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  errorMessage,
  successMessage,
  handleSubmit,
  isLoading,
  prevStep
}) => {

  const handleChange = (event) => {
    
    const { name, value } = event.target;

    if (name === 'name') setName(value.slice(0, 50));
    if (name === 'password') setPassword(value);
    if (name === 'confirmpassword') setConfirmPassword(value);
  };

  return (
    <div>  
      <form onSubmit={handleSubmit}>
        <InputText label={"Nome"} type="text" name="name" value={name} onChange={handleChange} placeholder="Digite seu nome completo" required />
        <InputText label={"Senha"} type="password" name="password" value={password} onChange={handleChange} placeholder="Digite sua nova senha" required />
        <InputText label={"Confirmação de senha"} type="password" name="confirmpassword" value={confirmPassword} onChange={handleChange} placeholder="Confirme sua senha" required />

        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}

        <Button
          type="submit"
          variant="secondary"
          id="margem"
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? "" : "Criar conta"}
        </Button>
    
      </form>
    </div>
  );
};


export default StepTwo;

  