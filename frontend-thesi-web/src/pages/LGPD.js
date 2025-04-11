import React from 'react';
import { Link } from 'react-router-dom';
import Rodape from '../components/Rodape';

function LGPD() {
 
    return (
        <>
        <div className='au-botao-login-container'>
            <div>
                <button className='thesi-botao-branco'>
                    <Link to="/inicio" className='thesi-link'>RETORNAR</Link>
                </button>
            </div>

            <div>
                <button className='thesi-botao-roxo'>
                    <Link to="/login" className='thesi-link'>FAZER LOGIN</Link>
                </button>
            </div>
        </div>

        <div className='au-titulo'>POLÍTICA E PRIVACIDADE</div>
        
        <div className= 'accordion-content-lgpd' >
            <div className='thesi-texto'> 
                A Lei Geral de Proteção de Dados Pessoais (LGPDP), também conhecida como LGPD, é a legislação brasileira que supervisiona as práticas relacionadas ao tratamento de dados pessoais. Ela se baseia em diversos princípios, incluindo o respeito à privacidade, autodeterminação informativa, liberdade de expressão, informação e opinião, bem como a proteção da intimidade, honra e imagem.
            </div> 

            <div className='thesi-texto'> 
                Além disso, a LGPD valoriza o desenvolvimento econômico e tecnológico, a inovação, a livre iniciativa, concorrência justa, defesa do consumidor e os direitos humanos à liberdade e dignidade.
            </div>

            <div className='thesi-texto'> 
                A LGPD introduz novos conceitos jurídicos, como "dados pessoais" e "dados pessoais sensíveis", e estabelece as condições para o tratamento desses dados. Ela define uma série de direitos para os titulares dos dados e impõe obrigações específicas aos controladores dos dados, bem como estabelece procedimentos e normas para garantir a segurança no tratamento e compartilhamento de dados pessoais. 
            </div>

            <div className='thesi-texto'> 
                A lei se aplica a todas as informações relacionadas a indivíduos identificados ou identificáveis, incluindo dados sobre origem racial ou étnica, crenças religiosas, opiniões políticas, filiação a sindicatos ou organizações religiosas, filosóficas ou políticas, dados de saúde ou vida sexual, dados genéticos ou biométricos, desde que estejam vinculados a um indivíduo.
            </div>

            <div className='thesi-texto'> 
                A THESI se preocupa com o tratamento de seus dados, por isso não compartilhamos com terceiros. Seus dados são criptografados e usados por você, com a finalidade de manter seus dados seguros e aprimorar a usabilidade do usuário. Nós armazenamos em nosso banco de dados que é gerenciado pelos desenvolvedores da plataforma de forma segura e confiável. 
            </div>
        </div>

        <Rodape/>
        </>
        );
}
export default LGPD;