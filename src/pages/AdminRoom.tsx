import { useHistory, useParams } from 'react-router'
import logoHome from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { CodSala } from '../components/CodSala'
import { Question } from '../components/Question'
import { UseRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/sala.scss'
import deleteImg from  '../assets/images/delete.svg'

type ParametrosSala = {
    id: string;
}

export function AdminRoom() {
    const history = useHistory();
    const parametros = useParams<ParametrosSala>();
    const idSala = parametros.id;
    const { pergunta, titulo } = UseRoom(idSala);

    async function handleEndRoom() {
        if (window.confirm("Deseja encerrar a sala?")){
            database.ref(`salas/${idSala}`).update({
                endedAt: new Date()
            })
            history.push('/')
        }
    }

    async function handleDeleteQuestion(perguntaId: string) {
        if (window.confirm("Deseja deletar a pergunta selecionada?")){
            await database.ref(`salas/${idSala}/perguntas/${perguntaId}`).remove()
        }
        
    }

    return (
        <div id="pag-sala">
            <header>
                <div className="content">
                    <img src={logoHome} alt="logo-home" />
                    <div>
                        <CodSala code={idSala} />
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                        >Encerrar Sala</Button>
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
                        >
                            <button
                                type='button'
                                onClick={() => handleDeleteQuestion(pergunta.id)}
                            >
                                <img src={deleteImg} alt="Excluir pergunta" />
                            </button>
                        </Question>
                    )
                })}
            </main>
        </div>
    )
}