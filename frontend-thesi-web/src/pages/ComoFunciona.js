import React from 'react';
import { Link } from 'react-router-dom';
import Rodape from '../components/Rodape';

function ComoFunciona() {
 
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

        <div className='au-titulo'>COMO A THESI FUNCIONA?</div>

        <div className= 'accordion-content-lgpd' >
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

        <Rodape/>
        
        </>
        );
}
export default ComoFunciona;