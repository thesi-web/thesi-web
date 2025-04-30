import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import InputText from '../components/InputText/InputText'
import styles from './ForgotPassword.module.css'

function ForgotPassword() {

const [email, setEmail] = useState ('');
const apiUrl = import.meta.env.VITE_API_URL;

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

  const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if (!email) {
        console.error("Email é obrigatório");
        return;
      }
      
      const res = await fetch(`${apiUrl}/api/request/password/change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        console.log("E-mail enviado com sucesso");
      } else {
        console.log("Erro na requisição:", res.statusText);
      }
    };

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
            
        <div className={styles.titleContainer} >
          <div className={'title'}>
              Forgot password?
          </div> 
          <p>No worries, we'll send you reset instructions.</p>
        </div>

        <form className="forgot-form" onSubmit={handleSubmit}>           
          < InputText
            label={"Enter your e-mail"}
            type="email"
            name="email"
            value={email}
            placeholder="enter your e-mail addres"
            onChange={handleEmailChange}
          />
            
          <Button variant={'secondary'} id={'form_btn'} type="submit">
            Get instructions
          </Button> 
 
          <div className={styles.textContainer} >
            Don't have an account? <a style={{ marginLeft: '10px' }} to="/create/account">Register here</a>
          </div>
       </form>
      </div>        
    </div>
  )
}

export default ForgotPassword;