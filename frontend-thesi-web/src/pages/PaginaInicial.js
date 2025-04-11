import Rodape from '../components/Rodape';
import '../styles/PaginaInicial.css';
import '../index.css'
import { Link } from 'react-router-dom';
import LogoThesi from '../assets/img/LogoThesi.png';
import HEURISTICA from '../assets/img/AvaliacaoHeuristica.png';
import SEMIOTICA from '../assets/img/InspecaoSemiotica.png';
import AVALIACOES from '../assets/img/AvaliacoesListadas.png';
import RELATORIOS from '../assets/img/Relatorios.png'

function PaginaInicial() {
  return (
    <div>
        <div className='pa-botao-login-container'>
            <div>
                <img className="login-logo" src={LogoThesi} alt="THESI" />
            </div>

            <div>
                <button className='thesi-botao-roxo'><Link to="/login" className='thesi-link'>
                    FAZER LOGIN</Link>
                </button>
            </div>
        </div>
            
        <div className='pa-container-botao'>
            <div className="thesi-titulo">
                Comece a avaliar interfaces de forma simples e prática!
            </div>
            <div className='thesi-botao-container'>
                <div>
                    <button className="thesi-botao-branco">
                    <Link to="/Know-More" className='thesi-link'>
                        SAIBA MAIS
                    </Link>
                    </button>
                </div>
                <div> 
                    <button className="thesi-botao-roxo">
                    <Link to="/criar-conta" className='thesi-link'>
                        QUERO CRIAR UMA CONTA!
                    </Link>
                    </button>
                </div>
            </div>
        </div>
        <div className='pa-conteudo-container'>
        <div className='pa-container'>
            <div className='thesi-titulo-lilas'>
                AVALIAÇÃO HEURÍSTICA
            </div>
            <div className='thesi-texto'>
                Trabalhe em seus projetos fazendo <span className='thesi-negrito'> Avaliação Heurística</span> seguindo as diretrizes de Nielsen!
            </div>
            <img className='pa-imagem' src={HEURISTICA} alt={'heuristica'} ></img>
        </div>

        <div className='pa-container'>
            <div className='thesi-titulo-lilas'>
                INSPEÇÃO SEMIÓTICA
            </div>
            <div className='thesi-texto'>
                Realize inspeções minuciosas em suas próprias telas seguindo a <span className='thesi-negrito'> Engenharia Semiótica</span>!
            </div>
            <img className='pa-imagem' src={SEMIOTICA} alt='semiotica'></img>
        </div>
                
        <div className='pa-container'>
            <div className='thesi-titulo-lilas'>
                AVALIAÇÕES LISTADAS!
            </div>
            <div className='thesi-texto'>
                Projetos disponíveis a qualquer momento <span className='thesi-negrito'> em seu perfil</span>.
            </div>
            <img className='pa-imagem' src={AVALIACOES} alt='avaliacoes'></img>
        </div>

        <div className='pa-container'>
            <div className='thesi-titulo-lilas'>
                RELATÓRIOS
            </div>
            <div className='thesi-texto'>
                Ao finalizar seu projeto de avaliação, faça o download de um <span className='thesi-negrito'> relatório detalhado</span> das validações feitas em equipe!
            </div>
                <img className='pa-imagem' src={RELATORIOS} alt='relatorios'></img>
        </div>
    </div>
        <Rodape/>
    </div>
  )
}

export default PaginaInicial;