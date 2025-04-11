import React, { useState, useEffect } from 'react';
import '../styles/MeuPerfil.css'
import Navbar from '../components/layout/Navbar';
import ProfileProfessor from '../components/layout/ProfileProfessor';
import pdf from '../assets/pdf/THESI - Tool of Heuristic Evaluation and Semiotic Inspection.pdf';

function MeuPerfilProfessor() {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

  const [professor, setProfessor] = useState([]);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/t_professor/${JSON.parse(atob(token.split('.')[1])).id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao Recuperar professor.');
        }
        const data = await response.json();
        console.log("Dados do professor:", data);
        setProfessor(data); // Armazena diretamente o objeto do professor
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchProfessor();
  }, []);
  

    return (
        <div className='perfil-container'>
            <Navbar/>
        
        <div>
            <div className='thesi-titulo-lilas-secao'> meu perfil </div>
            <ProfileProfessor professor={professor}/>
        </div>

        <div className='accordion'>
            <div className="accordion-item">
                <button
                    className={`accordion-header ${activeIndex === 1 ? 'active' : ''}`}
                    onClick={() => toggleAccordion(1)}
                >
                    <div className='s-titulo-dropdown'>Como Funciona?</div>
                </button>

                <div className={`accordion-content ${activeIndex === 0 ? 'active' : ''}`}>
                    <div className='thesi-texto'> 
                        Esta é uma ferramenta web que utiliza os métodos de Avaliação Heurística e Inspeção Semiótica como técnicas da área de Interação Humano-Computador (IHC). Com o objetivo de promover uma interção fácil e prática entre o usuário e a interface, propomos este software que auxilia o professor de IHC no ensino destas técnicas.
                    </div> 

                    <div className='thesi-texto'> 
                        Professores e Alunos podem se cadastrar e logar na ferramenta para avaliar os protótipos de seus projetos. Aqui você consegue marcar áreas na interface que possam conflitar o entedimento do usuário, podendo escolher entre heurísticas e sigos de semiótica. Você também pode fazer anotações sobre a área violada e sugestões de como corrigir esse possível erro.
                    </div>

                    <div className='thesi-texto'> 
                        Após a etapa de avaliação, você e seu grupo validam as marcações feitas para que possam obter um relatório claro do protótipo avaliado. Também é disponibilizado uma lista dos projetos que você participou, para assim poder revê-los a qualquer momento.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <button
                    className={`accordion-header ${activeIndex === 0 ? 'active' : ''}`}
                    onClick={() => toggleAccordion(0)}
                >
                    <div className='s-titulo-dropdown' > LGPD e a Privacidade dos Dados</div>
                </button>
                <div className={`accordion-content ${activeIndex === 0 ? 'active' : ''}`}>
                    <div className='thesi-texto'> 
                        A Lei Geral de Proteção de Dados Pessoais, também conhecida como LGPD, é a legislação brasileira que supervisiona as práticas relacionadas ao tratamento de dados pessoais. Ela se baseia em diversos princípios, incluindo o respeito à privacidade, autodeterminação informativa, liberdade de expressão, informação e opinião, bem como a proteção da intimidade, honra e imagem.
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
            </div>

            <div className="accordion-item">
                <button
                    className={`accordion-header ${activeIndex === 2 ? 'active' : ''}`}
                    onClick={() => toggleAccordion(2)}
                >
                    <div className='s-titulo-dropdown' >Ajuda e Documentação</div>
                </button>
                <div className={`accordion-content ${activeIndex === 2 ? 'active' : ''}`}>
                    <div className='thesi-texto' >Para acessar a documentação da THESI <div className='au-negrito'><a href={pdf} className="thesi-link" target="_blank" rel="noopener noreferrer">clique aqui</a></div>.</div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default MeuPerfilProfessor;