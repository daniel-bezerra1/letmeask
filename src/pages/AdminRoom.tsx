import { useParams } from 'react-router'
import logoHome from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { CodSala } from '../components/CodSala'
import { Question } from '../components/Question'
import { UseRoom } from '../hooks/useRoom'
import '../styles/sala.scss'

type ParametrosSala = {
    id: string;
}

export function AdminRoom() {
    const parametros = useParams<ParametrosSala>();
    const idSala = parametros.id;
    const { pergunta, titulo } = UseRoom(idSala);

    return (
        <div id="pag-sala">
            <header>
                <div className="content">
                    <img src={logoHome} alt="logo-home" />
                    <div>
                        <CodSala code={idSala} />
                        <Button isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="titulo-sala">
                    <h1>Sala: {titulo}</h1>
                    <span>{pergunta.length} pergunta(s)</span>
                </div>
                {pergunta.map(pergunta => {
                    return (
                        <Question
                            key={pergunta.id}
                            content={pergunta.content}
                            author={pergunta.author}
                        />
                    )
                })}
            </main>
        </div>
    )
}