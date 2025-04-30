import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputText from "../components/InputText/InputText";
import Button from "../components/Button/Button"
import styles from './ChangePassword.module.css'

function ChangePassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

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
      const res = await fetch(`${apiUrl}/api/password/change`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setMessage("Senha redefinida com sucesso!");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Erro ao redefinir a senha.");
      }
    } catch (err) {
      setMessage("Erro na requisição. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>

    <div className={styles.contentContainer}>
    <div>
    
    <div className={styles.titleContainer}>
      <div className={'title'}>Change Password</div>
      <p>Choose a new password to regain access to your account.</p>
    </div>
      <form onSubmit={handleSubmit}>
        <InputText
          label={"Set your new password"} 
          type="password"
          placeholder="type your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputText
          label={"Confirm your new password"} 
          type="password"
          placeholder="confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button id={'form_btn'} variant={'secondary'} type={"submit"}>
            Reset password
        </Button>
        {message && <div className={''}>{message}</div>}
      </form>
    </div>

      <div className={styles.textBalloon} >
        <div> When resetting your password, remember to follow these tips to keep your account secure.</div><br></br>
        <b>Create a strong password</b>
          <li>Use a mix of uppercase and lowercase letters, numbers, and symbols.</li><br></br>
        <b>Avoid obvious information</b>
          <li>Don't use names, birthdates, or easy-to-guess sequences.</li><br></br>
        <b>Keep it unique</b> 
          <li>Use a password that you don't use for other accounts.</li> <br></br>
        <div>Your security is our priority!🐤</div>
        </div>

    </div>
  </div>
  );
}

export default ChangePassword;
