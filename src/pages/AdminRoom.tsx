import { useHistory, useParams } from 'react-router'
import logoHome from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { CodSala } from '../components/CodSala'
import { Question } from '../components/Question'
import { UseRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/adminroom.scss'
import deleteImg from  '../assets/images/delete.svg'
import checkImg from  '../assets/images/check.svg'
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

    async function handleCheckQuestionAsAnswered(perguntaId: string) {
        await database.ref(`salas/${idSala}/perguntas/${perguntaId}`).update({
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(perguntaId: string) {
        await database.ref(`salas/${idSala}/perguntas/${perguntaId}`).update({
            isAnswered: true
        })        
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
                                className={`notAnswered-button ${pergunta.isAnswered ? 'asAnswered' : ''}`}
                                type='button'
                                onClick={() => handleCheckQuestionAsAnswered(pergunta.id)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </button>
                            <button
                                type='button'
                                onClick={() => handleHighlightQuestion(pergunta.id)}
                            >
                                <img src={checkImg} alt="Marcar pergunta" />
                            </button>
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