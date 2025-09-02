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
        <InputText label={"Enter your name"} type="text" name="name" value={name} onChange={handleChange} placeholder="type your full name" required />
        <InputText label={"Set your password"} type="password" name="password" value={password} onChange={handleChange} placeholder="type your password" required />
        <InputText label={"Confirm your password"} type="password" name="confirmpassword" value={confirmPassword} onChange={handleChange} placeholder="confirm your password" required />

        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }} >
        <Button variant={'transparent'} type={'button'} onClick={prevStep}>Back</Button>
        <Button type={"submit"} variant={'secondary'}>Create account</Button>
      </div>
      </form>
    </div>
  );
};


export default StepTwo;

  