import { useParams } from 'react-router'
import logoHome from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { CodSala } from '../components/CodSala'
import '../styles/sala.scss'

type ParametrosSala = {
    id: string;
}

export function Salas() {

    const parametros = useParams<ParametrosSala>();

    return (
        <div id="pag-sala">
            <header>
                <div className="content">
                    <img src={logoHome} alt="logo-home"/>
                    <CodSala code={parametros.id} />
                </div>
            </header>

            <main>
                <div className="titulo-sala">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea placeholder="La Pergunta?"></textarea>
                    <div className= "rodape-formulario">
                        <p>Para enviar uma pergunta, <button>faça seu login</button>.</p>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}